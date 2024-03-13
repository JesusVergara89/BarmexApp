import React, { useEffect, useState } from 'react';
import './Formpost.css';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth, db } from '../FirebaseConfig';

const Formpost = ({authFunction1}) => {
  const [user] = useAuthState(auth);

  const [cleanForm, setCleanForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    createdAt: Timestamp.now().toDate(),
  });

  useEffect(() => {
    console.log('form cleaned');
  }, [cleanForm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePublish = () => {
    if (!formData.name || !formData.email || !formData.description) {
      alert('please fill all the fields');
      return;
    }

    const articleRef = collection(db, 'Articles');
    addDoc(articleRef, {
      name: formData.name,
      email: formData.email,
      description: formData.description,
      createdAt: Timestamp.now().toDate(),
      createBy: user.displayName,
      userId: user.uid
    })
      .then(() => {
        toast('Article added successfully', { type: 'success' });
        setCleanForm(!cleanForm);
      })
      .catch(() => {
        toast('Error adding article', { type: 'error' });
      });
  };

  return (
    <article className="Form-post-container">
      <button className="Form-post-save" onClick={() => { signOut(auth); authFunction1()  }}>Sign out</button>
      <div className="Form-post">
        <h3 className="Form-post-title">Create post</h3>
        <input placeholder='Name' type="text" name="name" className="Form-post-title" value={formData.name} onChange={(e) => handleChange(e)} />
        <input placeholder='Email' type="email" name="email" className="Form-post-title" value={formData.email} onChange={(e) => handleChange(e)} />
        <textarea placeholder='Description' name="description" className="Form-post-description" value={formData.description} onChange={(e) => handleChange(e)} />
        <button className="Form-post-save" onClick={handlePublish}>Publish</button>
      </div>
    </article>
  );
};

export default Formpost;
