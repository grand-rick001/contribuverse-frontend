import { Injectable, inject, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map, tap } from 'rxjs';
import {
  ADD_FOLLOWER,
  DELETE_FOLLOWER,
  CREATE_USER,
} from '../../graphql/mutations';
import { Follower, UserModel } from '../../models/user.model';
import { GET_USER_BY_EMAIL, GET_USER_BY_ID } from '../../graphql/queries';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  isSingleUserLoading = signal(true);

  private apollo = inject(Apollo);

  getUserIdByEmail(email: string): Observable<string> {
    return this.apollo
      .watchQuery<any>({
        query: GET_USER_BY_EMAIL,
        variables: {
          email,
        },
      })
      .valueChanges.pipe(
        map((result) => result.data.getUserByEmail.id as string),
      );
  }

  createUser(
    name: string,
    email: string,
    profileImage: string,
  ): Observable<UserModel> {
    return this.apollo
      .mutate<UserModel>({
        mutation: CREATE_USER,
        variables: {
          name,
          email,
          profileImage,
        },
      })
      .pipe(map((result: any) => result.data.createUser));
  }

  getUserById(userId: string): Observable<UserModel> {
    return this.apollo
      .watchQuery<any>({
        query: GET_USER_BY_ID,
        variables: {
          userId,
        },
      })
      .valueChanges.pipe(
        map((result) => result.data.user as UserModel),
        tap(() => this.isSingleUserLoading.set(false)),
      );
  }

  getUserByEmail(email: string): Observable<UserModel> {
    return this.apollo
      .watchQuery<any>({
        query: GET_USER_BY_EMAIL,
        variables: {
          email,
        },
      })
      .valueChanges.pipe(
        map((result) => result.data.getUserByEmail as UserModel),
      );
  }

  addFollower(userId: string, followingUserId: string): Observable<Follower> {
    return this.apollo
      .mutate<Follower>({
        mutation: ADD_FOLLOWER,
        variables: {
          userId,
          follower: 1,
          followingUserId,
        },
      })
      .pipe(map((result: any) => result.data.addFollower));
  }

  deleteFollower(deleteFollowerId: string): Observable<Follower> {
    return this.apollo
      .mutate<Follower>({
        mutation: DELETE_FOLLOWER,
        variables: {
          deleteFollowerId,
        },
      })
      .pipe(map((result: any) => result.data.deleteFollower));
  }
}
