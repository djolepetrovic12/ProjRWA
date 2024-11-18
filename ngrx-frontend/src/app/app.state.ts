import { FlashcardState } from "./store/reducers/flashcard.reducer";
import { StudyResourceState } from "./store/reducers/studyResource.reducer";
import { UserState } from "./store/reducers/user.reducer";


export interface AppState
{
    user: UserState;
    flashcards: FlashcardState
    studyResources: StudyResourceState
}