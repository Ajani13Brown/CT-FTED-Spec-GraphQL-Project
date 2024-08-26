import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from './views/Profile';
import PostDetails from './views/PostDetails';
import Posts from './views/Posts';
import CreatePost from './views/CreatePost';

function App() {
  return (
    <Routes>
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/profile/:id/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes>
  );
}

export default App;
