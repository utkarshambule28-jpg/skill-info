import { useState, useEffect } from "react";
import { createExam } from "../utils/api";

export default function ExamGenerator({ onBack, onStartExam }) {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("Expert");
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(20);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const skills = [
    {
      id: "nlp",
      name: "Natural Language Processing (NLP)",
      categories: ["Transformers", "Embeddings", "Sentiment Analysis"],
    },
    {
      id: "cv",
      name: "Computer Vision",
      categories: ["CNNs", "Object Detection", "Image Classification"],
    },
    {
      id: "ml",
      name: "Machine Learning Fundamentals",
      categories: ["Supervised Learning", "Model Evaluation", "Algorithms"],
    },
    {
      id: "dl",
      name: "Deep Learning",
      categories: ["Neural Networks", "Backpropagation", "Optimization"],
    },
  ];

  const selectedSkillData = skills.find((s) => s.id === selectedSkill);

  const handleGenerateExam = async () => {
    if (!selectedSkill || !selectedCategory) {
      setErrorMessage("Please select both a skill and category.");
      return;
    }

    setErrorMessage(""); // Clear previous errors
    setIsGenerating(true);
    
    try {
      const payload = {
        skill: selectedSkillData.name,
        category: selectedCategory,
        difficulty: difficultyLevel,
        numQuestions,
        timeLimit,
      };

      const token = localStorage.getItem("skillforge_token");

      console.log("Sending payload: ", payload);

      const res = await createExam(payload, token);

      setIsGenerating(false);
      onStartExam(res.data.exam); // Pass backend generated exam to the parent
    } catch (err) {
      setIsGenerating(false);
      setErrorMessage(e.response?.data?.message || "Could not generate. Please check your internet connection");
      console.log("Error details in console");

 ```   } engineer