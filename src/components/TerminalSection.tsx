import React, { useState, useEffect, useRef } from "react";
import { PROJECTS, ABOUT_SKILLS, EXPERIENCE } from "../data";

export const TerminalSection = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: "cmd" | "resp"; text: string }[]>([
    { type: "resp", text: "MAYANK_OS v2.5.0 (Sketchbook Edition)" },
    { type: "resp", text: 'Type "help" to see available commands.' },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const COMMANDS = [
    "help",
    "about",
    "ls",
    "cat",
    "skills",
    "contact",
    "tree",
    "clear",
    "whoami",
  ];
  const PROJECT_IDS = PROJECTS.map((p) => p.id);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  useEffect(() => {
    const trimmed = input.trim();
    if (!trimmed) {
      setSuggestion("");
      return;
    }

    const parts = trimmed.split(" ");
    if (parts.length === 1) {
      const match = COMMANDS.find((c) => c.startsWith(parts[0]) && c !== parts[0]);
      setSuggestion(match || "");
    } else if (parts.length === 2 && (parts[0] === "cat" || parts[0] === "ls")) {
       const match = PROJECT_IDS.find((id) => id.startsWith(parts[1]) && id !== parts[1]);
       setSuggestion(match ? `${parts[0]} ${match}` : "");
    } else {
      setSuggestion("");
    }
  }, [input]);

  const addResponse = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setHistory((prev) => [...prev, { type: "resp", text }]);
      setIsTyping(false);
    }, 400);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdInput = input.toLowerCase().trim();
    if (!cmdInput || isTyping) return;

    setHistory((prev) => [...prev, { type: "cmd", text: input }]);
    const newCmdHistory = [input, ...cmdHistory].slice(0, 50);
    setCmdHistory(newCmdHistory);
    setHistoryIdx(-1);
    setInput("");

    const parts = cmdInput.split(" ");
    const cmd = parts[0];
    const arg = parts[1];

    let response = "";

    switch (cmd) {
      case "help":
        response = [
          "Available commands:",
          "  about    - Bio & philosophy",
          "  ls       - List key projects",
          "  cat [id] - Study project details",
          "  skills   - Core tech stack",
          "  tree     - Portfolio structure",
          "  contact  - Reach out",
          "  clear    - Erase terminal",
          "  whoami   - User context",
        ].join("\n");
        break;
      case "about":
        response =
          "Senior Frontend Engineer focusing on React & Next.js. I bridge the gap between design vision and technical implementation with 'Logic and Empathy'. Built high-traffic platforms (10k+ users) and AI-powered tools.";
        break;
      case "ls":
        response = PROJECTS.map((p) => p.id).join("  ");
        break;
      case "skills":
        response = "Main Toolkit:\n" + ABOUT_SKILLS.map(s => `  • ${s.name}`).join("\n");
        break;
      case "tree":
        response = [
          "portfolio_v2",
          "├── 📂 hero (the opening)",
          "├── 📂 about (the narrative)",
          "├── 📂 experience (the logbook)",
          "├── 📂 projects (the builds)",
          "├── 📂 ideas (the sketches)",
          "└── 📂 contact (the collab)",
        ].join("\n");
        break;
      case "contact":
        response = [
          "LinkedIn: linkedin.com/in/iammayank18",
          "GitHub: github.com/iammayank18",
          "Email: abhinavthakur958@gmail.com",
        ].join("\n");
        break;
      case "whoami":
        response = "visitor@mayank.dev - An explorer of digital sketchbooks.";
        break;
      case "clear":
        setHistory([]);
        return;
      case "cat":
        if (!arg) {
          response = "Usage: cat [project_id]. Try 'ls' for IDs.";
        } else {
          const project = PROJECTS.find((p) => p.id === arg);
          if (project) {
            response = [
              `${project.title}`,
              `---`,
              `Problem: ${project.problem}`,
              `Solution: ${project.solution}`,
              `Tech: ${project.tech.join(", ")}`,
            ].join("\n");
          } else {
            response = `Error: Project '${arg}' not found in logs.`;
          }
        }
        break;
      default:
        response = `zsh: command not found: ${cmd}. Type 'help' for guidance.`;
    }

    addResponse(response);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIdx < cmdHistory.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) {
        setInput(suggestion);
      }
    }
  };

  return (
    <div className="bg-[#121212] text-[#f0f0f0] sketch-border shadow-2xl max-w-2xl mx-auto overflow-hidden text-left font-mono text-sm">
      {/* Terminal Title Bar */}
      <div className="bg-[#1a1a1a] px-4 py-2 flex justify-between items-center border-b border-gray-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full border border-black/20 bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full border border-black/20 bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full border border-black/20 bg-[#27c93f]" />
        </div>
        <div className="text-gray-500 text-xs font-sketch">mayank@sketchbook — zsh</div>
        <div className="w-12" />
      </div>

      <div className="p-6">
        <div
          ref={scrollRef}
          className="h-72 overflow-y-auto mb-4 scrollbar-hide space-y-2"
        >
          {/* Logo ASCII */}
          <pre className="text-gray-500 text-[10px] leading-tight mb-6 opacity-80">
            {`
    ___  ___                      _    
   |  \\/  |                     | |   
   | .  . | __ _ _   _  __ _ _ _| | __
   | |\\/| |/ _\` | | | |/ _\` | '_ \\ |/ /
   | |  | | (_| | |_| | (_| | | | |   < 
   \\_|  |_/\\__,_|\\__, |\\__,_|_| |_|_|\\_\\
                  __/ |                 
                 |___/                  
          `}
          </pre>

          {history.map((line, i) => (
            <div
              key={i}
              className={line.type === "cmd" ? "text-white" : "text-gray-400 whitespace-pre-wrap"}
            >
              {line.type === "cmd" ? (
                <div className="flex items-start gap-2">
                   <span className="text-green-400 select-none">➜</span>
                   <span className="text-blue-400 select-none">~</span>
                   <span>{line.text}</span>
                </div>
              ) : (
                <div className="pl-6">{line.text}</div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="pl-6 text-gray-500 animate-pulse">Typing...</div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleCommand} className="relative flex items-start gap-2">
          <span className="text-green-400 select-none shrink-0">➜</span>
          <span className="text-blue-400 select-none shrink-0">~</span>
          <div className="relative flex-1">
            {suggestion && (
              <div className="absolute inset-0 pointer-events-none text-gray-700">
                {suggestion}
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none w-full text-white caret-transparent relative z-10"
              autoFocus
              spellCheck={false}
              disabled={isTyping}
            />
            {!isTyping && (
                <span className="absolute h-4 w-2 bg-green-400 animate-cursor-blink" 
                      style={{ 
                          left: `${input.length * 8.4}px`, 
                          top: '2px',
                          display: 'inline-block' 
                      }}>
                </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
