import { useEffect, useState } from "react";
import { useAppUser } from "../../context/AppUserContext";
import {
  Box,
  Button,
  Stack,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Skeleton,
} from "@mui/material";
import { useActiveProgramme } from "../../context/ActiveProgrammeContext";
import { toastError } from "../../components/ErrorToast";
import { httpService } from "../../httpService";

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
  questionBank?: string;
  questionsCount: number;
  questionIndex: number;
}

export interface IUserAnswer {
  questionBankId: string;
  questionId: string;
  selectedAnswer: string;
}
function QuestionsDisplay() {
  const { user } = useAppUser();

  const { activeProgramme, setActiveProgramme } = useActiveProgramme();
  const [questionBanks, setQuestionBanks] = useState<IQuestionBank[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, IUserAnswer>>({});

  const currentBank = questionBanks[activeProgramme?.index || 0];

  const currentQuestion = currentBank?.questions[currentBank.questionIndex];

  // const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const answer = event.target.value;

  //   setAnswers((prev) => ({
  //     ...prev,
  //     [currentQuestion?._id]: {
  //       questionBankId: currentBank.questionBank ?? "",
  //       questionId: currentQuestion?._id ?? "",
  //       selectedAnswer: answer,
  //     },
  //   }));
  // };

  const getData = async () => {
    try {
      const { data } = await httpService("cbt/getquestions");

      if (data) {
        const modifiedData = data.map((q: IQuestionBank) => ({
          ...q,
          questionIndex: 0,
        }));

        setQuestionBanks(modifiedData);
      }

      setLoading(false);
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    if (user && user.programmes.length)
      setActiveProgramme({
        ...user?.programmes[0],
        index: 0,
      });

    getData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeProgramme) return;

      const target = e.target as HTMLElement;

      // Ignore typing in inputs
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const currentBank = questionBanks[activeProgramme.index];

      if (!currentBank) return;

      const currentQuestion = currentBank.questions[currentBank.questionIndex];

      if (!currentQuestion) return;

      const key = e.key.toUpperCase();

      switch (key) {
        // Option shortcuts
        case "A":
        case "B":
        case "C":
        case "D":
        case "E":
        case "F":
        case "G":
        case "H":
        case "I":
        case "J": {
          const optionIndex = key.charCodeAt(0) - 65;

          if (optionIndex < currentQuestion.options.length) {
            e.preventDefault();
            selectOption(currentQuestion.options[optionIndex]);
          }

          break;
        }

        // Next Question
        case "N":
        case "ARROWRIGHT":
          e.preventDefault();
          nextQuestion();
          break;

        // Previous Question
        case "P":
        case "ARROWLEFT":
          e.preventDefault();
          previousQuestion();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [questionBanks, activeProgramme, answers]);

  const nextQuestion = () => {
    if (!activeProgramme) return;

    const currentBank = questionBanks[activeProgramme.index];

    if (currentBank.questionIndex < currentBank.questions.length - 1) {
      handleQuestionChange(currentBank.questionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (!activeProgramme) return;

    const currentBank = questionBanks[activeProgramme.index];

    if (currentBank.questionIndex > 0) {
      handleQuestionChange(currentBank.questionIndex - 1);
    }
  };
  const handleQuestionChange = (questionIndex: number) => {
    if (!activeProgramme) return;

    setQuestionBanks((prev) =>
      prev.map((bank, index) =>
        index === activeProgramme.index
          ? {
              ...bank,
              questionIndex,
            }
          : bank,
      ),
    );
  };

  if (loading) {
    return <QuestionsDisplaySkeleton />;
  }

  const selectOption = (option: string) => {
    if (!activeProgramme) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion?._id]: {
        questionBankId: currentBank.questionBank ?? "",
        questionId: currentQuestion?._id ?? "",
        selectedAnswer: option,
      },
    }));
  };

  return (
    <div>
      <Stack direction={"row"} spacing={1} sx={{ mb: 2 }}>
        {user?.programmes.map((c, index) => (
          <Button
            key={c._id ?? index}
            variant={
              activeProgramme?.index === index ? "contained" : "outlined"
            }
            onClick={() =>
              setActiveProgramme({
                ...c,
                index,
              })
            }
          >
            {c.name}
          </Button>
        ))}
      </Stack>
      {activeProgramme && (
        <Box>
          <Box sx={{ mb: 1 }}>
            <div>
              <Typography variant="caption">
                Question{" "}
                {questionBanks[activeProgramme?.index]?.questionIndex + 1}
              </Typography>
            </div>
          </Box>
          <Box sx={{ mb: 3 }}>
            <div
              style={{ fontSize: 18 }}
              dangerouslySetInnerHTML={{
                __html:
                  questionBanks[activeProgramme?.index]?.questions[
                    questionBanks[activeProgramme?.index]?.questionIndex
                  ]?.question,
              }}
            />
          </Box>
          <Box>
            <FormControl fullWidth>
              <RadioGroup
                value={answers[currentQuestion._id]?.selectedAnswer ?? ""}
                onChange={(e) => selectOption(e.target.value)}
              >
                {questionBanks[activeProgramme?.index]?.questions[
                  questionBanks[activeProgramme?.index]?.questionIndex
                ]?.options.map((option, index) => {
                  const optionLetter = String.fromCharCode(65 + index);

                  return (
                    <Box
                      key={index}
                      sx={{
                        mb: 2,
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "primary.main",
                          backgroundColor: "action.hover",
                        },
                      }}
                    >
                      <FormControlLabel
                        value={option}
                        control={<Radio />}
                        sx={{
                          width: "100%",
                          alignItems: "flex-start",
                          m: 0,
                        }}
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 2,
                              width: "100%",
                              py: 0.5,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                                minWidth: 30,
                              }}
                            >
                              {optionLetter}.
                            </Typography>

                            <Box
                              sx={{
                                flex: 1,
                                fontSize: 18,
                              }}
                              dangerouslySetInnerHTML={{
                                __html: option,
                              }}
                            />
                          </Box>
                        }
                      />
                    </Box>
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box
            sx={{
              p: 2,
              maxHeight: "30vh",
              overflow: "auto",
              border: "4px solid",
              borderColor: "primary.main",
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          >
            {questionBanks[activeProgramme?.index]?.questions.map((p, i) => (
              <Button
                key={p.questionId}
                onClick={() => handleQuestionChange(i)}
                size="small"
                variant={
                  questionBanks[activeProgramme.index].questionIndex === i
                    ? "contained"
                    : answers[p._id]
                      ? "outlined"
                      : "outlined"
                }
                sx={{
                  bgcolor: answers[p._id] ? "success.light" : undefined,
                  mr: 1,
                  mb: 1,
                  color: answers[p._id] ? "white" : undefined,
                }}
              >
                {i + 1}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </div>
  );
}

export default QuestionsDisplay;

const QuestionsDisplaySkeleton = () => {
  return (
    <Box>
      {/* Programme buttons */}
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" width={120} height={40} />
        ))}
      </Stack>

      {/* Question number */}
      <Skeleton width={120} height={25} sx={{ mb: 2 }} />

      {/* Question */}
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} width="90%" />
      <Skeleton variant="text" height={40} width="75%" />

      <Box sx={{ mt: 4 }}>
        {[1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 2,
              mb: 2,
            }}
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Skeleton variant="circular" width={24} height={24} />

              <Box sx={{ flex: 1 }}>
                <Skeleton height={30} width="95%" />
                <Skeleton height={30} width="75%" />
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>

      {/* Question navigator */}
      <Box
        sx={{
          mt: 3,
          p: 2,
          border: "4px solid",
          borderColor: "primary.main",
          borderRadius: 2,
        }}
      >
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" width={40} height={35} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
