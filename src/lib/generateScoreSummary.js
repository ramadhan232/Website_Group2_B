import connectToDatabase from "@/lib/mongoose";
import Score from "@/models/Score";
import HotsQuestion from "@/models/HotsQuestion";
import ScoreSummary from "@/models/ScoreSummary";

export async function generateScoreSummary(studentId) {
  await connectToDatabase();

  // 1. Ambil semua skor milik siswa
  const scores = await Score.find({ student_id: studentId });

  if (!scores.length) return { status: "no_scores_found" };

  // 2. Ambil semua HOTS question untuk mapping chapter_number
  const allQuestions = await HotsQuestion.find({});
  const questionMap = {};
  for (const q of allQuestions) {
    questionMap[q.question_id] = q.chapter_number;
  }

  // 3. Kelompokkan skor per chapter
  const chapterScores = {}; // { 1: [80, 90], 2: [70, 85] }
  for (const score of scores) {
    const chapter = questionMap[score.question_id];
    if (!chapterScores[chapter]) chapterScores[chapter] = [];
    chapterScores[chapter].push(score.score);
  }

  // 4. Hitung dan simpan summary per chapter
  const summaries = [];
  for (const [chapter, values] of Object.entries(chapterScores)) {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    summaries.push({
      student_id: studentId,
      chapter_number: parseInt(chapter),
      average_score: Math.round(avg),
      total_questions: values.length,
      level: "per_chapter"
    });
  }

  // 5. Hitung total summary
  const allScores = Object.values(chapterScores).flat();
  const overallAvg = allScores.reduce((a, b) => a + b, 0) / allScores.length;

  summaries.push({
    student_id: studentId,
    average_score: Math.round(overallAvg),
    total_questions: allScores.length,
    level: "total"
  });

  // 6. Simpan semuanya
  await ScoreSummary.deleteMany({ student_id: studentId }); // bersihkan lama
  await ScoreSummary.insertMany(summaries);

  return { status: "ok", summaries };
}
