import { useExam } from "../../context/exam/ExamContext";
import { Box, Button } from "@mui/material";
import { useActiveProgramme } from "../../context/ActiveProgrammeContext";

function QuestionsButton() {
  const { questionBanks, answers, setCurrentQuestion, getCurrentIndex } =
    useExam();

  const { activeProgramme } = useActiveProgramme();

  const currentBank = questionBanks.find(
    (b) => b.programme === activeProgramme?._id,
  );

  const bankId = currentBank?.questionBank || "";
  const currentIndex = getCurrentIndex(bankId);
  return (
    <Box
      sx={{
        p: 2,
        maxHeight: "30vh",
        overflow: "auto",
        border: "2px solid",
        borderColor: "primary.main",
        borderRadius: 2,
        display: "flex",
        flexWrap: "wrap",
        gap: 0.75,
      }}
    >
      {currentBank?.questions.map((q, i) => {
        const isCurrent = currentIndex === i;
        const isAnswered = !!answers[q._id];

        return (
          <Button
            key={q._id}
            onClick={() => setCurrentQuestion(bankId, i)}
            variant={isCurrent ? "contained" : "outlined"}
            sx={{
              minWidth: 34,
              width: 34,
              height: 34,
              p: 0,
              fontSize: "0.75rem",
              borderRadius: 1,

              bgcolor: isAnswered ? "success.main" : undefined,
              color: isAnswered ? "#fff" : undefined,
              borderColor: isAnswered ? "success.main" : undefined,

              "&:hover": {
                bgcolor: isCurrent
                  ? "primary.dark"
                  : isAnswered
                    ? "success.dark"
                    : "action.hover",
              },
            }}
          >
            {i + 1}
          </Button>
        );
      })}
    </Box>
  );
}

export default QuestionsButton;
