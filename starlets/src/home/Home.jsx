import "./home.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { articles as articlesData } from "../Data/articles";
import wolfImage from "../img/wolf.jpeg";
import healthimage from "../img/health.jpg";
import womanimage from "../img/woman.jpeg";
import vitaminsimage from "../img/vitamins.jpg";
import fitnessimage from "../img/fitness.jpg";
import womimage from "../img/wom.jpeg";
import chatbotimage from "../img/chatbot.png";

const articles = [
  {
    id: 1,
    title: "How often should check ups be",
    content:
      "Health is the cornerstone of a fulfilling life, encompassing physical, mental, and emotional well-being. It is nurtured through balanced nutrition, regular exercise, and adequate rest. Mental health plays a crucial role, influencing how we perceive and interact with the world. Cultivating good habits and seeking preventive care are pivotal in maintaining optimal health throughout life. Ultimately, prioritizing health empowers individuals to lead vibrant and productive lifestyles.",
    image: healthimage,
    profileImage: wolfImage,
    section: "top",
    word: "TOP PICKS",
  },
  {
    id: 2,
    title: "Is vitamin C the way to go",
    content:
      "Vitamin C, also known as ascorbic acid, is a water-soluble nutrient essential for maintaining overall health. It supports the immune system by aiding in the production of white blood cells and antibodies that fight infections. Additionally, vitamin C is a powerful antioxidant that helps protect cells from damage caused by free radicals. It plays a key role in collagen synthesis, vital for the health of skin, joints, and blood vessels. Found abundantly in fruits and vegetables like citrus fruits, strawberries, and bell peppers, ensuring an adequate intake of vitamin C is crucial for optimal health and well-being.",
    image: vitaminsimage,
    profileImage: womanimage,
    section: "top1",
    word: "FOLLOWING",
  },
  {
    id: 3,
    title: "The Transformative Power of Fitness",
    content:
      "Fitness is more than just physical strength; it encompasses overall well-being achieved through regular physical activity, proper nutrition, and mental resilience. Engaging in a balanced fitness regimen not only improves cardiovascular health, muscle strength, and flexibility but also enhances mood and reduces stress levels. It involves setting realistic goals, such as increasing endurance or building muscle, and consistently challenging oneself to achieve them. Beyond physical benefits, fitness promotes longevity and a higher quality of life by boosting energy levels and promoting better sleep patterns. Embracing fitness as a lifestyle choice leads to greater self-confidence and a sense of accomplishment in daily activities.",
    image: fitnessimage,
    profileImage: womimage,
    section: "top2",
    word: "FITNESS",
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle article click and navigate to the corresponding article
  const handleArticleClick = (articleId) => {
    navigate(`/articles/${articleId}`);
  };

  return (
    <div className="body">
      <header className="header">
        <nav className="navbar">
          <span className="nav-item">HOME</span>
          <button className="close-btn">X</button>
        </nav>
      </header>
      <div className="search-container">
        <input
          type="text"
          placeholder="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <img src={wolfImage} alt="Wolf" className="profile" />

      <hr />
      <div className="links">
        <Link to="/articles" className="link-item">
          My Articles
        </Link>
        <Link to="#" className="link-item">
          Create Post
        </Link>
        <Link to="#" className="link-item">
          My Profile
        </Link>
        <Link to="#" className="link-item">
          Following
        </Link>
        <Link to="#" className="link-item">
          Favourites
        </Link>
      </div>

      {filteredArticles.map((article) => (
        <section
          key={article.id}
          className={article.section}
          onClick={() => handleArticleClick(article.id)}
          style={{ cursor: "pointer" }}
        >
          <div className="word">{article.word}</div>
          <div className="container">
            <div className="top-picks">
              <img src={article.image} alt="Blog" className="blogpic" />
              <img
                src={article.profileImage}
                alt="Profile"
                className="profileblog"
              />
              <div className="text-content">
                <span className="hh">{article.title}</span>
                <p>{article.content}</p>
              </div>
            </div>
            <div className="blue-box"></div>
          </div>
        </section>
      ))}

      <div className="chat">
        <img src={chatbotimage} alt="Chatbot" className="bot" />
      </div>
    </div>
  );
}
