import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const AchievementCards = () => {
  const achievements = [
    {
      rank: "#2",
      subtitle: "out of 45 students",
      percentage: "96.2%",
      timeRange: "15 Sep to Nov",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      rank: "#5",
      subtitle: "in Mathematics",
      percentage: "92.8%",
      timeRange: "Last Quarter",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      rank: "#8",
      subtitle: "Overall Rank",
      percentage: "89.5%",
      timeRange: "This Year",
      gradient: "from-emerald-400 to-emerald-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {achievements.map((achievement, index) => (
        <Card 
          key={index}
          className={`relative overflow-hidden bg-gradient-to-br ${achievement.gradient} text-white`}
        >
          <div className="absolute top-2 right-2">
            <Trophy className="w-5 h-5 opacity-50" />
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold mb-1">
              {achievement.rank}
            </div>
            <div className="text-sm opacity-90 mb-3">
              {achievement.subtitle}
            </div>
            <div className="flex justify-between items-end">
              <div className="text-2xl font-semibold">
                {achievement.percentage}
              </div>
              <div className="text-xs opacity-75">
                {achievement.timeRange}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AchievementCards;