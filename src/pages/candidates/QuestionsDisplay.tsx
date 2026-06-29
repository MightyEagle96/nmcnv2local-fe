import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { useAppUser } from "../../context/AppUserContext";
import { useActiveProgramme } from "../../context/ActiveProgrammeContext";
import { httpService } from "../../httpService";
import { toastError } from "../../components/ErrorToast";

import { useExam } from "../../context/exam/ExamContext";
import QuestionsButton from "./QuestionsButton";

function QuestionsDisplay() {
  const { user } = useAppUser();
  const { activeProgramme, setActiveProgramme } = useActiveProgramme();

  const {
    questionBanks,
    answers,
    setQuestionBanks,
    selectOption,
    nextQuestion,
    previousQuestion,

    getCurrentIndex,
  } = useExam();

  const [loading, setLoading] = useState(true);

  // =========================
  // ACTIVE BANK (IMPORTANT FIX)
  // =========================
  const currentBank = questionBanks.find(
    (b) => b.programme === activeProgramme?._id,
  );

  const bankId = currentBank?.questionBank || "";

  const currentIndex = getCurrentIndex(bankId);

  const currentQuestion = currentBank?.questions[currentIndex];

  // =========================
  // FETCH QUESTIONS
  // =========================
  const getData = async () => {
    try {
      const { data } = await httpService("cbt/getquestions");

      if (data) {
        setQuestionBanks(data);
      }
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.programmes?.length) {
      setActiveProgramme({
        ...user.programmes[0],
        index: 0,
      });
    }

    getData();
  }, []);

  // =========================
  // KEYBOARD HANDLING
  // =========================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentQuestion || !bankId) return;

      const target = e.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return;

      const key = e.key.toUpperCase();

      // A - J options
      if (key >= "A" && key <= "J") {
        const index = key.charCodeAt(0) - 65;

        if (index < currentQuestion.options.length) {
          e.preventDefault();

          selectOption({
            questionBankId: bankId,
            questionId: currentQuestion._id,
            selectedAnswer: currentQuestion.options[index],
            programme: activeProgramme?._id || "",
          });
        }
      }

      // NEXT
      if (key === "N" || key === "ARROWRIGHT") {
        e.preventDefault();
        nextQuestion(bankId);
      }

      // PREVIOUS
      if (key === "P" || key === "ARROWLEFT") {
        e.preventDefault();
        previousQuestion(bankId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestion, bankId]);

  // =========================
  // OPTION SELECT
  // =========================
  const handleSelect = (value: string) => {
    if (!currentQuestion || !bankId) return;

    selectOption({
      questionBankId: bankId,
      questionId: currentQuestion._id,
      selectedAnswer: value,
      programme: activeProgramme?._id || "",
    });
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* PROGRAMME SWITCH */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {user?.programmes.map((c, index) => (
          <Button
            key={c._id ?? index}
            variant={
              activeProgramme?.index === index ? "contained" : "outlined"
            }
            onClick={() => setActiveProgramme({ ...c, index })}
          >
            {c.name}
          </Button>
        ))}
      </Stack>

      {/* QUESTION AREA */}
      {currentBank && currentQuestion && (
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Question {currentIndex + 1}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{
                __html: currentQuestion.question,
              }}
            />
          </Box>

          {/* OPTIONS */}
          <Box>
            <FormControl fullWidth>
              <RadioGroup
                value={answers[currentQuestion._id]?.selectedAnswer || ""}
                onChange={(e) => handleSelect(e.target.value)}
              >
                {currentQuestion.options.map((option, i) => (
                  <Box
                    key={i}
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
                            {String.fromCharCode(65 + i)}.
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
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          {/* NAVIGATION */}
          {/* <Box sx={{ mt: 2 }}>
            <Button onClick={() => previousQuestion(bankId)}>Previous</Button>

            <Button sx={{ ml: 2 }} onClick={() => nextQuestion(bankId)}>
              Next
            </Button>
          </Box> */}

          <QuestionsButton />
        </Box>
      )}
    </div>
  );
}

export default QuestionsDisplay;
