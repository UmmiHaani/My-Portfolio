import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code2, Database, Layout, Cloud } from "lucide-react";
import { motion } from "motion/react";

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Layout className="w-5 h-5" />,
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML/CSS"]
    },
    {
      title: "Backend",
      icon: <Code2 className="w-5 h-5" />,
      skills: ["Node.js", "Python", "Java", "Express", "REST APIs"]
    },
    {
      title: "Database",
      icon: <Database className="w-5 h-5" />,
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma"]
    },
    {
      title: "DevOps & Tools",
      icon: <Cloud className="w-5 h-5" />,
      skills: ["Git", "Docker", "AWS", "CI/CD", "Linux"]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technical Skills
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <motion.div key={category.title} variants={item}>
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {category.icon}
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
