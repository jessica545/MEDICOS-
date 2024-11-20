// src/components/VideoRecordings.jsx
import React, { useState } from 'react';
import '../styles/videoRecordings.css';

const videos = [
  {
    id: 1,
    title: 'Human Anatomy',
    description: 'A detailed video on human anatomy for medical students.',
    url: 'https://www.youtube.com/watch?v=JNTOahIeCfA',
    thumbnail: 'https://tse4.mm.bing.net/th?id=OIP.TyjgFB5pGAhtArHCx2znPAHaCW&pid=Api&P=0&h=220',
  },
  {
    id: 2,
    title: 'Physiology',
    description: 'A comprehensive look at the concept of Physiology.',
    url: 'https://www.youtube.com/watch?v=6qk_LTVXZ2wA',
    thumbnail: 'https://tse1.mm.bing.net/th?id=OIP.ZXAAOdN-HAHk20eHciP4GQHaEK&pid=Api&P=0&h=220',
  },
  {
    id: 3,
    title: 'Biochemistry',
    description: 'A complete overview of Biochemistry',
    url: 'https://www.youtube.com/watch?v=91IuG_Hx9i4',
    thumbnail: 'https://tse3.mm.bing.net/th?id=OIP.-G3XbzjL5h47r1nmyNXXmgAAAA&pid=Api&P=0&h=220',
  },
  // Add more medical videos here...
];

function VideoRecordings() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="video-recordings-container">
      <h2>Medical Video Recordings</h2>
      <input
        type="text"
        placeholder="Search videos..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="video-list">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div key={video.id} className="video-item">
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
              </div>
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-button"
                >
                  Watch Now
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No videos found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default VideoRecordings;
