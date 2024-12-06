import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CreateAComment, CreateACommentFailure, CreateACommentSuccess } from "../actions/comment.actions";
import { Comment } from "../../models/comment";
import { CommentService } from "../../services/Comment/comment.service";



@Injectable()
export class CommentEffects {
  constructor(
    private actions$: Actions,
    private commentService: CommentService,
  ) {}

    createAComment$ = createEffect(() => 
        this.actions$.pipe(
            ofType(CreateAComment),
                switchMap(({userID,resourceID,content}) => 
                    this.commentService.createAComment(userID,resourceID,content).pipe(
                        map((response) =>  CreateACommentSuccess({comment:<Comment>response}) ),
                        catchError((error) => of(CreateACommentFailure({ error:error })))
                        )
                    )
                    )
                )


}
