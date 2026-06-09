import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { GraduationCap, Award } from "lucide-react";
import { motion } from "motion/react";

export function Education() {
  return (
    <section id="education" className="py-20 px-4 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education & Achievements
        </motion.h2>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <motion.div
                    className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg"
                    whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                  >
                    <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <div className="flex-grow">
                    <CardTitle>Bachelor of Science in Computer Science</CardTitle>
                    <CardDescription>University Name • Expected Graduation: 2027</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  GPA: 3.8/4.0
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Relevant Coursework: Data Structures & Algorithms, Database Systems,
                  Web Development, Machine Learning, Software Engineering, Operating Systems
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <motion.div
                    className="p-3 bg-green-100 dark:bg-green-900 rounded-lg"
                    whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                  >
                    <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <div className="flex-grow">
                    <CardTitle>Certifications & Awards</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• AWS Certified Cloud Practitioner</li>
                  <li>• Dean's List (2024, 2025, 2026)</li>
                  <li>• Hackathon Winner - University Tech Summit 2025</li>
                  <li>• President, Computer Science Student Association</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
