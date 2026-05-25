import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "motion/react";

export function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack online shopping platform with user authentication, product management, and payment integration.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered responses using OpenAI API and WebSocket connections.",
      tags: ["Next.js", "TypeScript", "OpenAI", "WebSocket"],
      github: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "Task Management System",
      description: "Collaborative task tracking tool with drag-and-drop functionality, team collaboration, and analytics.",
      tags: ["React", "Express", "PostgreSQL", "Redis"],
      github: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "Weather Forecast App",
      description: "Mobile-responsive weather application with location-based forecasts and interactive weather maps.",
      tags: ["React", "Tailwind", "Weather API", "Leaflet"],
      github: "https://github.com",
      demo: "https://example.com"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section id="projects" className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-center mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Here are some of my recent projects that showcase my skills in full-stack development
        </motion.p>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={item}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="h-full"
              >
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
