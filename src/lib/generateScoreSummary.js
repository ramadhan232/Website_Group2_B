import Score from "@/models/Score";
import ScoreSummary from "@/models/ScoreSummary";
import mongoose from "mongoose";

export default async function generateScoreSummary(student_id) {
  // Pastikan ID valid
  const studentObjectId = new mongoose.Types.ObjectId(student_id);

  // Ambil semua skor siswa
  const scores = await Score.find({ student_id: studentObjectId });

  if (!scores.length) return;

  // Hapus summary lama
  await ScoreSummary.deleteMany({ student_id: studentObjectId });

  // Hitung per bab
  const perChapter = {};
  for (const s of scores) {
    if (!perChapter[s.chapter_number]) {
      perChapter[s.chapter_number] = { total: 0, count: 0 };
    }
    perChapter[s.chapter_number].total += s.score;
    perChapter[s.chapter_number].count++;
  }

  // Simpan ringkasan per chapter
  for (const [chapterStr, { total, count }] of Object.entries(perChapter)) {
    const chapter_number = parseInt(chapterStr);
    await ScoreSummary.create({
      student_id,
      chapter_number,
      average_score: total / count,
      total_questions: count,
      level: "per_chapter",
    });
  }

  // Simpan ringkasan total
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  await ScoreSummary.create({
    student_id,
    average_score: totalScore / scores.length,
    total_questions: scores.length,
    level: "total",
  });
}
