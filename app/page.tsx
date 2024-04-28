import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Life Redemption</h1>
      <p className="mb-4">
        Life Redemption is a chatbot designed to help people overcome drug addiction. Our chatbot
        can generate stories, provide remedies for the illness, and give details about doctors who
        treat addiction.
      </p>
      <p className="mb-4">
        Whether you're struggling with addiction or want to help someone who is, Life Redemption is
        here to provide support and guidance.
      </p>
      <p className="mb-4">
        To start using Life Redemption, simply click on the chat icon in the top left corner of
        your screen and begin chatting with our chatbot.
      </p>
    </div>
  );
};

export default Home;
