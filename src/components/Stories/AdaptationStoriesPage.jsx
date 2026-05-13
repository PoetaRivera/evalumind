import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { adaptationStories, findMatchingStories } from '../../data/adaptationStories';
import { getCompletedTests } from '../../utils/sessionResults';

function StoryCard({ story, isMatching }) {
  const navigate = useNavigate();

  return (
    <article
      className="adaptation-story"
      style={{
        border: isMatching ? '2px solid #8b5cf6' : '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        background: isMatching ? '#faf5ff' : '#fff',
      }}
    >
      {isMatching && (
        <span style={{
          background: '#8b5cf6', color: '#fff', padding: '3px 10px',
          borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600,
          marginBottom: '12px', display: 'inline-block',
        }}>
          Coincide con tu perfil
        </span>
      )}

      <header style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '4px', color: '#1f2937' }}>{story.title}</h2>
        <p style={{ fontSize: '0.95rem', color: '#6b7280', margin: 0 }}>{story.subtitle}</p>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {story.tags.map((tag) => (
          <span key={tag} style={{
            background: '#f3f4f6', color: '#4b5563', padding: '3px 10px',
            borderRadius: '12px', fontSize: '0.8rem',
          }}>
            {tag}
          </span>
        ))}
      </div>

      <section style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '0.95rem', color: '#dc2626', marginBottom: '6px' }}>Antes</h3>
        <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>{story.content.before}</p>
      </section>

      <section style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '0.95rem', color: '#d97706', marginBottom: '6px' }}>El punto de inflexión</h3>
        <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>{story.content.turningPoint}</p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '0.95rem', color: '#059669', marginBottom: '6px' }}>Después</h3>
        <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>{story.content.after}</p>
      </section>

      <blockquote style={{
        borderLeft: '4px solid #8b5cf6', padding: '12px 16px', margin: '0 0 20px 0',
        background: '#f5f3ff', borderRadius: '0 8px 8px 0',
      }}>
        <p style={{ fontSize: '0.95rem', color: '#5b21b6', fontStyle: 'italic', margin: 0 }}>
          "{story.content.lesson}"
        </p>
      </blockquote>

      <footer>
        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4b5563', marginBottom: '8px' }}>Tests relacionados:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {story.resources.map((res) => (
            <button
              key={res.testId}
              className="btn btn-secondary"
              onClick={() => navigate(`/test/${res.testId}`)}
              style={{ fontSize: '0.85rem', padding: '6px 14px' }}
            >
              {res.label}
            </button>
          ))}
        </div>
      </footer>
    </article>
  );
}

export default function AdaptationStoriesPage() {
  const completedTests = useMemo(() => getCompletedTests(), []);
  const matchingStories = useMemo(() => findMatchingStories(completedTests), [completedTests]);
  const matchingIds = new Set(matchingStories.map((s) => s.id));

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Historias de Adaptación</h2>
      <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.95rem', marginBottom: '32px' }}>
        Casos reales anónimos de personas que transformaron sus patrones neurodivergentes en ventajas.
      </p>

      {/* Historias que coinciden con el perfil del usuario primero */}
      {matchingStories.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '0.9rem', color: '#8b5cf6', fontWeight: 600, marginBottom: '16px' }}>
            Historias que coinciden con tu perfil
          </p>
          {matchingStories.map((story) => (
            <StoryCard key={story.id} story={story} isMatching />
          ))}
        </div>
      )}

      {/* Todas las historias */}
      {adaptationStories.map((story) => (
        <StoryCard key={story.id} story={story} isMatching={matchingIds.has(story.id)} />
      ))}
    </div>
  );
}
