import { FlashcardState } from "./store/reducers/flashcard.reducer";
import { UserState } from "./store/reducers/user.reducer";


export interface AppState
{
    user: UserState;
    flashcards: FlashcardState
}