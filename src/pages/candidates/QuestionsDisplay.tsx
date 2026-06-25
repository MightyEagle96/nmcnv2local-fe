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
function QuestionsDisplay() {
  const { user } = useAppUser();

  const { activeProgramme, setActiveProgramme } = useActiveProgramme();
  const [questionBanks, setQuestionBanks] = useState<IQuestionBank[]>([]);

  const getData = async () => {
    try {
      const { data } = await httpService("cbt/getquestions");

      if (data) {
        const modifiedData = data.map((q: IQuestionBank) => ({
          ...q,
          questionIndex: 0,
        }));

        console.log(modifiedData);

        setQuestionBanks(modifiedData);
      }
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
              // value={selectedAnswer}
              // onChange={handleAnswerChange}
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
                  questionBanks[activeProgramme?.index]?.questionIndex === i
                    ? "contained"
                    : "outlined"
                }
                sx={{ mr: 1, mb: 1 }}
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
