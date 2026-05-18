"use client";

import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { logoutAction } from '../actions/authenticate';



export default function Dashboard() {
  // State tracks the ID of the expanded journey. Null means all are closed.
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Mock data with an array of timestamped events
  const recentJourneys = [
    { 
      id: 1, 
      title: "Res Vill - 3rd Floor Round", 
      date: "May 12, 2026",
      duration: "11:00 PM - 11:19 PM", 
      status: "Completed", 
      loggedBy: "Lane Klarenbeek",
      notes: [
        { time: "11:00 PM", text: "Started rounds on the east wing." },
        { time: "11:07 PM", text: "Trash room was slightly overflowing but no safety hazards." },
        { time: "11:15 PM", text: "Checked all stairwells and emergency exits. Doors secure." },
        { time: "11:19 PM", text: "Completed rounds. Noise levels well within quiet hours policy." }
      ]
    },
    { 
      id: 2, 
      title: "Res Vill - 3rd Floor Round", 
      date: "May 11, 2026",
      duration: "8:00 PM - 8:25 PM", 
      status: "Completed", 
      loggedBy: "Lane Klarenbeek",
      notes: [
        { time: "8:00 PM", text: "Began standard evening rounds." },
        { time: "8:10 PM", text: "Addressed a minor noise complaint in the north wing. Residents were cooperative." },
        { time: "8:25 PM", text: "Followed up on the north wing, remained quiet. Rounds complete." }
      ]
    },
    { 
      id: 3, 
      title: "Res Vill - 3rd Floor Round", 
      date: "May 10, 2026",
      duration: "10:15 PM - 10:30 PM", 
      status: "Completed", 
      loggedBy: "Lane Klarenbeek",
      notes: [
        { time: "10:15 PM", text: "Started rounds." },
        { time: "10:22 PM", text: "Noticed a flicker in the south stairwell light fixture. Submitted maintenance ticket." },
        { time: "10:30 PM", text: "Rounds finished with no other issues." }
      ]
    },
  ];

  return (
    <main className={styles.pageWrapper}>
      <header className={styles.topHeader}>
        <h1 className={styles.pageTitle}>Overview</h1>
        
        {/* Updated User Profile Section */}
        <div className={styles.userProfile}>
          <div className={styles.avatar}>L</div>
          
          <div className={styles.profileText}>
            <span className={styles.greeting}>Welcome, Lane</span>
            
            {/* The Logout Form */}
            <form action={logoutAction}>
              <button type="submit" className={styles.logoutButton}>
                Log Out
              </button>
            </form>
          </div>

        </div>
      </header>

      {/* Restored the two-column Grid Layout */}
      <div className={styles.dashboardGrid}>
        
        {/* Left Hand Section: Accordion Feed */}
        <section className={styles.sidebar}>
          <h2 className={styles.sectionHeading}>Recently Completed</h2>
          
          <div className={styles.journeyList}>
            {recentJourneys.map((journey) => {
              const isExpanded = selectedId === journey.id;

              return (
                <article 
                  key={journey.id} 
                  className={`${styles.journeyCard} ${isExpanded ? styles.activeCard : ''}`}
                >
                  <div 
                    className={styles.cardHeader}
                    onClick={() => setSelectedId(isExpanded ? null : journey.id)}
                  >
                    <div>
                      <h3 className={styles.journeyTitle}>{journey.title}</h3>
                      <p className={styles.journeyTime}>{journey.date} • {journey.duration}</p>
                    </div>
                    <span className={styles.statusBadge}>{journey.status}</span>
                  </div>

                  {isExpanded && (
                    <div className={styles.expandedContent}>
                      <div className={styles.metaDivider}></div>
                      
                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Logged By:</span>
                        <span className={styles.metaValue}>{journey.loggedBy}</span>
                      </div>

                      <h4 className={styles.timelineHeading}>Journey Timeline</h4>
                      
                      <ul className={styles.timelineList}>
                        {journey.notes.map((note, index) => (
                          <li key={index} className={styles.timelineItem}>
                            <span className={styles.timestamp}>{note.time}</span>
                            <span className={styles.noteText}>{note.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Right Hand Section: Future Development Canvas */}
        <section className={styles.mainContent}>
          <div className={styles.placeholderBox}>
            <p>Future Development Workspace</p>
            <span style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.7 }}>
              (Analytics, active rosters, or quick actions will go here)
            </span>
          </div>
        </section>

      </div>
    </main>
  );
}