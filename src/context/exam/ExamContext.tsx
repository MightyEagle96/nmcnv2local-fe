// import { createContext, useContext, useMemo, useReducer } from "react";

// export interface IQuestion {
//   question: string;
//   questionId: string;
//   options: string[];
//   correctAnswer: string;
//   startGroup: boolean;
//   clustered: boolean;
//   endGroup: boolean;
//   _id: string;
// }

// export interface IQuestionBank {
//   programme: string;
//   isTaken: boolean;
//   dateCreated: Date;
//   questions: IQuestion[];
//   dateTaken: Date;
//   questionBankCategory?: number;
//   questionBank?: string;
//   questionsCount: number;
//   questionIndex: number;
// }

// export interface IUserAnswer {
//   questionBankId: string;
//   questionId: string;
//   selectedAnswer: string;
// }

// interface IExamState {
//   questionBanks: IQuestionBank[];
//   answers: Record<string, IUserAnswer>;
// }

// type ExamAction =
//   | {
//       type: "SET_QUESTION_BANKS";
//       payload: IQuestionBank[];
//     }
//   | {
//       type: "SELECT_OPTION";
//       payload: IUserAnswer;
//     }
//   | {
//       type: "SET_CURRENT_QUESTION";
//       payload: {
//         programmeIndex: number;
//         questionIndex: number;
//       };
//     }
//   | {
//       type: "NEXT_QUESTION";
//       payload: {
//         programmeIndex: number;
//       };
//     }
//   | {
//       type: "PREVIOUS_QUESTION";
//       payload: {
//         programmeIndex: number;
//       };
//     };

// const initialState: IExamState = {
//   questionBanks: [],
//   answers: {},
// };

// function examReducer(state: IExamState, action: ExamAction): IExamState {
//   switch (action.type) {
//     case "SET_QUESTION_BANKS":
//       return {
//         ...state,
//         questionBanks: action.payload,
//       };

//     case "SELECT_OPTION":
//       return {
//         ...state,
//         answers: {
//           ...state.answers,
//           [action.payload.questionId]: action.payload,
//         },
//       };

//     case "SET_CURRENT_QUESTION":
//       return {
//         ...state,
//         questionBanks: state.questionBanks.map((bank, index) =>
//           index === action.payload.programmeIndex
//             ? {
//                 ...bank,
//                 questionIndex: action.payload.questionIndex,
//               }
//             : bank,
//         ),
//       };

//     case "NEXT_QUESTION":
//       return {
//         ...state,
//         questionBanks: state.questionBanks.map((bank, index) => {
//           if (index !== action.payload.programmeIndex) return bank;

//           return {
//             ...bank,
//             questionIndex: Math.min(
//               bank.questionIndex + 1,
//               bank.questions.length - 1,
//             ),
//           };
//         }),
//       };

//     case "PREVIOUS_QUESTION":
//       return {
//         ...state,
//         questionBanks: state.questionBanks.map((bank, index) => {
//           if (index !== action.payload.programmeIndex) return bank;

//           return {
//             ...bank,
//             questionIndex: Math.max(bank.questionIndex - 1, 0),
//           };
//         }),
//       };

//     default:
//       return state;
//   }
// }

// interface IExamContext {
//   questionBanks: IQuestionBank[];
//   answers: Record<string, IUserAnswer>;

//   setQuestionBanks: (banks: IQuestionBank[]) => void;

//   selectOption: (answer: IUserAnswer) => void;

//   setCurrentQuestion: (programmeIndex: number, questionIndex: number) => void;

//   nextQuestion: (programmeIndex: number) => void;

//   previousQuestion: (programmeIndex: number) => void;

//   answeredByBank: Record<string, number>;

//   totalAnswered: number;

//   getAnsweredCountForBank: (questionBankId: string) => number;

//   getCurrentBank: (programmeIndex: number) => IQuestionBank;

//   getCurrentQuestion: (programmeIndex: number) => IQuestion;

//   getBankStats: (questionBankId: string) => {
//     total: number;
//     answered: number;
//   };

//   totalQuestions: number;
// }

// const ExamContext = createContext<IExamContext | null>(null);

// export function ExamProvider({ children }: { children: ReactNode }) {
//   const [state, dispatch] = useReducer(examReducer, initialState);

//   const setQuestionBanks = (banks: IQuestionBank[]) => {
//     dispatch({
//       type: "SET_QUESTION_BANKS",
//       payload: banks,
//     });
//   };

//   const selectOption = (answer: IUserAnswer) => {
//     dispatch({
//       type: "SELECT_OPTION",
//       payload: answer,
//     });
//   };

//   const setCurrentQuestion = (
//     programmeIndex: number,
//     questionIndex: number,
//   ) => {
//     dispatch({
//       type: "SET_CURRENT_QUESTION",
//       payload: {
//         programmeIndex,
//         questionIndex,
//       },
//     });
//   };

//   const getCurrentBank = (programmeIndex: number) => {
//     return state.questionBanks[programmeIndex];
//   };

//   const nextQuestion = (programmeIndex: number) => {
//     dispatch({
//       type: "NEXT_QUESTION",
//       payload: {
//         programmeIndex,
//       },
//     });
//   };

//   const previousQuestion = (programmeIndex: number) => {
//     dispatch({
//       type: "PREVIOUS_QUESTION",
//       payload: {
//         programmeIndex,
//       },
//     });
//   };

//   const answeredByBank = useMemo(() => {
//     const result: Record<string, number> = {};

//     Object.values(state.answers).forEach((answer) => {
//       result[answer.questionBankId] = (result[answer.questionBankId] || 0) + 1;
//     });

//     return result;
//   }, [state.answers]);

//   const totalQuestions = useMemo(() => {
//     return state.questionBanks.reduce((sum, bank) => {
//       return sum + bank.questions.length;
//     }, 0);
//   }, [state.questionBanks]);

//   const totalAnswered = useMemo(
//     () => Object.keys(state.answers).length,
//     [state.answers],
//   );

//   const getAnsweredCountForBank = (questionBankId: string) =>
//     answeredByBank[questionBankId] ?? 0;

//   const getBankStats = (questionBankId: string) => {
//     const bank = state.questionBanks.find(
//       (b) => b.questionBank === questionBankId,
//     );

//     const total = bank?.questions.length || 0;
//     const answered = answeredByBank[questionBankId] || 0;

//     return { total, answered };
//   };

//   return (
//     <ExamContext.Provider
//       value={{
//         questionBanks: state.questionBanks,
//         answers: state.answers,

//         setQuestionBanks,

//         selectOption,

//         setCurrentQuestion,

//         nextQuestion,

//         previousQuestion,

//         answeredByBank,

//         totalAnswered,

//         getAnsweredCountForBank,

//         getCurrentBank,

//         totalQuestions,

//         getBankStats,
//       }}
//     >
//       {children}
//     </ExamContext.Provider>
//   );
// }

// export function useExam() {
//   const context = useContext(ExamContext);

//   if (!context) {
//     throw new Error("useExam must be used within an ExamProvider");
//   }

//   return context;
// }

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useCallback,
} from "react";

import type { ReactNode } from "react";
export interface IQuestion {
  question: string;
  questionId: string;
  options: string[];
  correctAnswer: string;
  startGroup: boolean;
  clustered: boolean;
  endGroup: boolean;
  _id: string;
}

export interface IQuestionBank {
  programme: string;
  isTaken: boolean;
  dateCreated: Date;
  questions: IQuestion[];
  dateTaken: Date;
  questionBankCategory?: number;
  questionBank?: string; // treat as BANK ID
  questionsCount: number;
}

export interface IUserAnswer {
  questionBankId: string;
  questionId: string;
  selectedAnswer: string;
  programme: string;
}

interface IExamState {
  questionBanks: IQuestionBank[];
  answers: Record<string, IUserAnswer>;

  // NEW: navigation state (no mutation of questionBanks)
  currentQuestionIndexByBank: Record<string, number>;
}

type ExamAction =
  | {
      type: "SET_QUESTION_BANKS";
      payload: IQuestionBank[];
    }
  | {
      type: "SELECT_OPTION";
      payload: IUserAnswer;
    }
  | {
      type: "SET_CURRENT_QUESTION";
      payload: {
        bankId: string;
        index: number;
      };
    }
  | {
      type: "NEXT_QUESTION";
      payload: {
        bankId: string;
      };
    }
  | {
      type: "PREVIOUS_QUESTION";
      payload: {
        bankId: string;
      };
    };

const initialState: IExamState = {
  questionBanks: [],
  answers: {},
  currentQuestionIndexByBank: {},
};

function examReducer(state: IExamState, action: ExamAction): IExamState {
  switch (action.type) {
    case "SET_QUESTION_BANKS":
      return {
        ...state,
        questionBanks: action.payload,
      };

    case "SELECT_OPTION":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload,
        },
      };

    case "SET_CURRENT_QUESTION":
      return {
        ...state,
        currentQuestionIndexByBank: {
          ...state.currentQuestionIndexByBank,
          [action.payload.bankId]: action.payload.index,
        },
      };

    case "NEXT_QUESTION": {
      const current =
        state.currentQuestionIndexByBank[action.payload.bankId] || 0;

      const bank = state.questionBanks.find(
        (b) => b.questionBank === action.payload.bankId,
      );

      if (!bank) return state;

      return {
        ...state,
        currentQuestionIndexByBank: {
          ...state.currentQuestionIndexByBank,
          [action.payload.bankId]: Math.min(
            current + 1,
            bank.questions.length - 1,
          ),
        },
      };
    }

    case "PREVIOUS_QUESTION": {
      const current =
        state.currentQuestionIndexByBank[action.payload.bankId] || 0;

      return {
        ...state,
        currentQuestionIndexByBank: {
          ...state.currentQuestionIndexByBank,
          [action.payload.bankId]: Math.max(current - 1, 0),
        },
      };
    }

    default:
      return state;
  }
}

interface IExamContext {
  questionBanks: IQuestionBank[];
  answers: Record<string, IUserAnswer>;

  setQuestionBanks: (banks: IQuestionBank[]) => void;

  selectOption: (answer: IUserAnswer) => void;

  setCurrentQuestion: (bankId: string, index: number) => void;

  nextQuestion: (bankId: string) => void;

  previousQuestion: (bankId: string) => void;

  getCurrentQuestion: (bankId: string) => IQuestion | undefined;

  getCurrentBank: (bankId: string) => IQuestionBank | undefined;

  getCurrentIndex: (bankId: string) => number;

  totalAnswered: number;

  totalQuestions: number;

  answeredByBank: Record<string, number>;

  answeredByProgramme: Record<string, number>;

  getBankStats: (bankId: string) => {
    total: number;
    answered: number;
  };
}

const ExamContext = createContext<IExamContext | null>(null);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(examReducer, initialState);

  // =========================
  // ACTIONS
  // =========================

  const setQuestionBanks = useCallback((banks: IQuestionBank[]) => {
    dispatch({ type: "SET_QUESTION_BANKS", payload: banks });
  }, []);

  const selectOption = useCallback((answer: IUserAnswer) => {
    dispatch({ type: "SELECT_OPTION", payload: answer });
  }, []);

  const setCurrentQuestion = useCallback((bankId: string, index: number) => {
    dispatch({
      type: "SET_CURRENT_QUESTION",
      payload: { bankId, index },
    });
  }, []);

  const nextQuestion = useCallback((bankId: string) => {
    dispatch({ type: "NEXT_QUESTION", payload: { bankId } });
  }, []);

  const previousQuestion = useCallback((bankId: string) => {
    dispatch({ type: "PREVIOUS_QUESTION", payload: { bankId } });
  }, []);

  // =========================
  // DERIVED STATE
  // =========================

  const answeredByBank = useMemo(() => {
    const result: Record<string, number> = {};

    Object.values(state.answers).forEach((a) => {
      result[a.questionBankId] = (result[a.questionBankId] || 0) + 1;
    });

    return result;
  }, [state.answers]);

  const answeredByProgramme = useMemo(() => {
    const result: Record<string, number> = {};

    Object.values(state.answers).forEach((a) => {
      const bank = state.questionBanks.find(
        (b) => b.questionBank === a.questionBankId,
      );

      if (!bank) return;

      const programme = bank.programme;

      result[programme] = (result[programme] || 0) + 1;
    });

    return result;
  }, [state.answers, state.questionBanks]);

  const totalAnswered = useMemo(
    () => Object.keys(state.answers).length,
    [state.answers],
  );

  const totalQuestions = useMemo(() => {
    return state.questionBanks.reduce((sum, b) => sum + b.questions.length, 0);
  }, [state.questionBanks]);

  // =========================
  // HELPERS
  // =========================

  const getCurrentBank = useCallback(
    (bankId: string) => {
      return state.questionBanks.find((b) => b.questionBank === bankId);
    },
    [state.questionBanks],
  );

  const getCurrentIndex = useCallback(
    (bankId: string) => {
      return state.currentQuestionIndexByBank[bankId] || 0;
    },
    [state.currentQuestionIndexByBank],
  );

  const getCurrentQuestion = useCallback(
    (bankId: string) => {
      const bank = state.questionBanks.find((b) => b.questionBank === bankId);

      if (!bank) return undefined;

      const index = state.currentQuestionIndexByBank[bankId] || 0;

      return bank.questions[index];
    },
    [state.questionBanks, state.currentQuestionIndexByBank],
  );

  const getBankStats = useCallback(
    (bankId: string) => {
      const bank = state.questionBanks.find((b) => b.questionBank === bankId);

      const total = bank?.questions.length || 0;
      const answered = answeredByBank[bankId] || 0;

      return { total, answered };
    },
    [state.questionBanks, answeredByBank],
  );

  return (
    <ExamContext.Provider
      value={{
        questionBanks: state.questionBanks,
        answers: state.answers,

        setQuestionBanks,
        selectOption,

        setCurrentQuestion,
        nextQuestion,
        previousQuestion,

        getCurrentBank,
        getCurrentQuestion,
        getCurrentIndex,

        totalAnswered,
        totalQuestions,
        answeredByBank,
        answeredByProgramme,
        getBankStats,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);

  if (!context) {
    throw new Error("useExam must be used within ExamProvider");
  }

  return context;
}
