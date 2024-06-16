import "./articles.css";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { articles as articlesData } from "../Data/articles";
import backimage from "../img/back.png";
import wolfImage from "../img/wolf.jpeg";
import bookmarkImage from "../img/bookmark.png";
import shareImage from "../img/share.png";
import healthImage from "../img/health.jpg";
import vitaminsimage from "../img/vitamins.jpg";
import womanimage from "../img/woman.jpeg";

const articles = [
  {
    id: 1,
    title: "How often should check ups be",
    content:
      "Health is the cornerstone of a fulfilling life, encompassing physical, mental, and emotional well-being. It is nurtured through balanced nutrition, regular exercise, and adequate rest. Mental health plays a crucial role, influencing how we perceive and interact with the world. Cultivating good habits and seeking preventive care are pivotal in maintaining optimal health throughout life. Ultimately, prioritizing health empowers individuals to lead vibrant and productive lifestyles.",
    image: healthImage,
    profileImage: wolfImage,
  },
  {
    id: 2,
    title: "Is vitamin C the way to go",
    content:
      "Vitamin C, also known as ascorbic acid, is a water-soluble nutrient essential for maintaining overall health. It supports the immune system by aiding in the production of white blood cells and antibodies that fight infections. Additionally, vitamin C is a powerful antioxidant that helps protect cells from damage caused by free radicals. It plays a key role in collagen synthesis, vital for the health of skin, joints, and blood vessels. Found abundantly in fruits and vegetables like citrus fruits, strawberries, and bell peppers, ensuring an adequate intake of vitamin C is crucial for optimal health and well-being.",
    image: vitaminsimage,
    profileImage: womanimage,
  },
];

export default function Articles() {
  const { articleId } = useParams(); // Get article ID from URL parameters
  const articles = articlesData;
  const article = articles.find((a) => a.id === Number(articleId)); // Find the corresponding article

  const [ratings, setRatings] = useState([0, 0]); // Initialize state for ratings
  const [comments, setComments] = useState([[], []]); // hii ndio part itainitialize state ya comments
  const [newComment, setNewComment] = useState(["", ""]); // Initialize state for new comments
  const [bookmarks, setBookmarks] = useState([false, false]); // Initialize state for bookmarks

  const handleStarClick = (index, articleIndex) => {
    const newRatings = [...ratings];
    if (newRatings[articleIndex] === index) {
      // If the clicked star is already selected, unrate it
      newRatings[articleIndex] = index - 1;
    } else {
      // Otherwise, set the rating to the clicked star
      newRatings[articleIndex] = index;
    }
    setRatings(newRatings);
  };

  const handleCommentChange = (event, articleIndex) => {
    const newCommentTexts = [...newComment];
    newCommentTexts[articleIndex] = event.target.value;
    setNewComment(newCommentTexts);
  };

  const handleCommentSubmit = (event, articleIndex) => {
    event.preventDefault();
    if (newComment[articleIndex].trim()) {
      const newComments = [...comments];
      newComments[articleIndex] = [
        ...newComments[articleIndex],
        newComment[articleIndex],
      ];
      setComments(newComments);
      setNewComment((prev) => {
        const newCommentTexts = [...prev];
        newCommentTexts[articleIndex] = "";
        return newCommentTexts;
      });
    }
  };

  const handleBookmarkClick = (articleIndex) => {
    const newBookmarks = [...bookmarks];
    newBookmarks[articleIndex] = !newBookmarks[articleIndex]; // Toggle bookmark state
    setBookmarks(newBookmarks);

    // Add bounce class
    const bookmarkIcon = document.getElementById(`bookmark-${articleIndex}`);
    bookmarkIcon.classList.add("bounce");

    // Remove bounce class after animation
    setTimeout(() => {
      bookmarkIcon.classList.remove("bounce");
    }, 500); //usichange hii value
  };

  return (
    <div className="articles-container">
      <header className="header1">
        <span className="art">Article</span>
        <Link to="/home" className="">
          <img src={backimage} alt="Back" className="backbtn" />
        </Link>
        <button className="closebtn">X</button>
        <img src={wolfImage} alt="Wolf" className="profile" />
        <img src={bookmarkImage} alt="bookmark" className="mark" />
        <img src={shareImage} alt="share" className="share" />
      </header>

      {article && (
        <>
          <div className="article-content">
            <img src={article.image} alt={article.title} className="blogpicc" />
            <img
              src={article.profileImage}
              alt="Profile"
              className="profileblogg"
            />
            <div className="text-cnt">
              <span className="hhh">{article.title}</span>
              <p className="para">{article.content}</p>
            </div>
          </div>

          <div className="stars">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <span
                key={index}
                className={`star ${
                  ratings[article.id - 1] >= star ? "selected" : ""
                }`}
                onClick={() => handleStarClick(star, article.id - 1)}
              >
                ★
              </span>
            ))}
          </div>

          <div
            className="bookmark-icon"
            onClick={() => handleBookmarkClick(article.id - 1)}
          >
            <img
              id={`bookmark-${article.id - 1}`}
              src={bookmarkImage}
              alt="Bookmark"
              className={`bookmark ${
                bookmarks[article.id - 1] ? "bookmarked" : ""
              }`}
            />
          </div>

          <span className="coms">Comments section</span>

          <div className="comments-section">
            <form
              onSubmit={(event) => handleCommentSubmit(event, article.id - 1)}
              className="form"
            >
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment[article.id - 1]}
                onChange={(event) => handleCommentChange(event, article.id - 1)}
              />
              <button type="submit">Post</button>
            </form>
            <div className="comments">
              {comments[article.id - 1].map((comment, index) => (
                <p key={index}>{comment}</p>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
//if you add a curly brace hapa chini no matter what vs code tells you, the code will crash!!
