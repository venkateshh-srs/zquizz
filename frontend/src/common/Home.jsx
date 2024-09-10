import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h2>Zquiz</h2>
          </div>
        </div>
      </header>
      <section className="main-content">
        <div className="content-container">
          <div className="text-and-paragraph-container">
            <div className="text-content2">
              <div>
                <h2>Create Quiz</h2>
                <Link to="admin/create-quiz">
                  <button className="start-btn">Create new Quiz</button>
                </Link>
              </div>
            </div>

            <div className="paragraph">
              <Typography variant="h5" color="textSecondary">
                Design quizzes with ease and share them instantly
              </Typography>
            </div>
          </div>

          <div className="text-and-paragraph-container">
            <div className="paragraph">
              <Typography variant="h5" color="textSecondary">
                Access quizzes via unique links and get instant results
              </Typography>
            </div>
            <div className="text-content1">
              <div>
                <h2>Ready for quiz?</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
