import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

class ErrorBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <main className="fatal"><h1>화면을 표시하지 못했습니다.</h1><p>저장된 기록은 삭제하지 않았습니다. 페이지를 다시 열어 주세요.</p><button onClick={() => location.reload()}>새로고침</button></main>;
    return this.props.children;
  }
}
createRoot(document.getElementById('root')).render(<React.StrictMode><ErrorBoundary><App /></ErrorBoundary></React.StrictMode>);
