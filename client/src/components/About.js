import React from "react";
import image from "../images/IMG_3164.jpg";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-container-image">
        <img alt="about" className="about-image" src={image} />
      </div>
      <div className="about-container-text">
        <h4>Hello, and welcome to my React.js project!</h4>
        <p>
          My name is Vladimir, and I'm a data engineer who recently came to the
          Netherlands in 2022. As an aspiring developer, I created this project
          to showcase my React.js skills and demonstrate my passion for
          programming.
          <br />
          <br />
          If you're interested in learning more about me, you can find all of my
          documentation on my GitHub page. There, you'll see that I'm a
          detail-oriented and responsible individual with a balanced and
          sociable personality. I have practical skills in data administration
          and network equipment configuration, as well as strong business
          communication skills and an analytical mindset.
          <br />
          <br />
          I'm always eager to learn and adapt to new challenges, and I'm
          confident that my skills and experience make me a valuable addition to
          any team. Thank you for taking the time to visit my project, and I
          hope to hear from you soon!
          <br />
          <br />
          And a special thanks to HackYourFuture school for providing me with
          excellent training in web development. Thanks to their rigorous
          curriculum and supportive community, I feel confident in my skills and
          am excited to pursue a career in tech. If you're as impressed by
          HackYourFuture's mission as I am, I encourage you to consider making a
          donation to support their important work in empowering refugees and
          other underserved groups through technology education.
        </p>
      </div>
    </div>
  );
};

export default About;