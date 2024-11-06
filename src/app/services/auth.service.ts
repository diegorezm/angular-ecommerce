import {Injectable} from '@angular/core';
import {User} from "../interfaces/user";
import {genId} from "../../utils/gen-id";
import {BehaviorSubject, Observable} from "rxjs";

const AUTH_KEY = 'auth';
const USER_KEY = 'users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(this.loadCurrentUser());
  currentUser$ = this.currentUserSubject.asObservable();
  constructor() {}

  getUsers(): User[] {
    const usersStored = localStorage.getItem(USER_KEY);
    if (usersStored) {
      return JSON.parse(usersStored) as User[];
    }
    return [];
  }

  login({email, password}: {email: string, password: string}): User | null {
    const users = this.getUsers();
    const user = users.find(u => u.email === email);
    if (user && user.password === password) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({
        sessionId: user.id
      }));
      this.currentUserSubject.next(user);
      return user;
    }
    return null;
  }

  register({name, email, password}: {name: string, email: string, password: string}): User {
    const users = this.getUsers();
    const user = {id: genId(), name, email, password};
    users.push(user);
    localStorage.setItem(USER_KEY, JSON.stringify(users));
    return user;
  }

  logout(): void {
    this.clearCurrentUser();
  }

  isLoggedIn(): boolean {
    const sessionData = localStorage.getItem(AUTH_KEY);
    if (!sessionData) return false;

    try {
      const {sessionId} = JSON.parse(sessionData);
      const users = this.getUsers();
      return users.some(user => user.id === sessionId);
    } catch (e) {
      console.error('Error checking login status', e);
      return false;
    }
  }

  loadCurrentUser(): User | null {
    const sessionData = localStorage.getItem(AUTH_KEY);
    if (!sessionData) return null;
    try {
      const {sessionId} = JSON.parse(sessionData);
      const users = this.getUsers();
      return users.find(user => user.id === sessionId) || null;
    } catch (e) {
      return null;
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  private clearCurrentUser(): void {
    localStorage.removeItem(AUTH_KEY);
    this.currentUserSubject.next(null);
  }

}
