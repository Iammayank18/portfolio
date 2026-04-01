import React, { useState, useEffect, useRef } from "react";
import { PROJECTS } from "../data";

export const TerminalSection = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<
    { type: "cmd" | "resp"; text: string }[]
  >([
    { type: "resp", text: "MAYANK_OS v2.0.0" },
    { type: "resp", text: 'Type "help" to see available commands.' },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const COMMANDS = [
    "help",
    "about",
    "ls",
    "cat",
    "skills",
    "socials",
    "date",
    "whoami",
    "clear",
  ];
  const PROJECT_IDS = PROJECTS.map((p) => p.id);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const trimmed = input.trim();
    if (!trimmed) {
      setSuggestion("");
      return;
    }

    const parts = trimmed.split(" ");
    if (parts.length === 1) {
      const match = COMMANDS.find(
        (c) => c.startsWith(parts[0]) && c !== parts[0],
      );
      setSuggestion(match || "");
    } else if (parts.length === 2 && parts[0] === "cat") {
      const match = PROJECT_IDS.find(
        (id) => id.startsWith(parts[1]) && id !== parts[1],
      );
      setSuggestion(match ? `${parts[0]} ${match}` : "");
    } else {
      setSuggestion("");
    }
  }, [input]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    if (!cmd) return;

    let response: string | string[] = "";
    const newCmdHistory = [input, ...cmdHistory].slice(0, 50);
    setCmdHistory(newCmdHistory);
    setHistoryIdx(-1);

    switch (cmd) {
      case "help":
        response = [
          "Available commands:",
          "  about    - Who is Mayank?",
          "  ls       - List projects",
          "  cat      - View project details (e.g., cat real-estate)",
          "  skills   - Technical stack",
          "  socials  - Connect with me",
          "  date     - Current system time",
          "  whoami   - Current user info",
          "  clear    - Clear terminal",
        ].join("\n");
        break;
      case "about":
        response =
          "Frontend Engineer. Product Builder. UX Enthusiast. I build things that work and look good.";
        break;
      case "ls":
        response = PROJECTS.map((p) => p.id).join("  ");
        break;
      case "skills":
        response =
          "React, TypeScript, Next.js, React Native, Playwright, Node.js, Framer Motion.";
        break;
      case "socials":
        response =
          "LinkedIn: /in/mayank-dev | GitHub: @mayank-builds | Twitter: @mayank_codes";
        break;
      case "date":
        response = new Date().toString();
        break;
      case "whoami":
        response =
          "guest@mayank.dev - A curious visitor exploring the sketchbook.";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        if (cmd.startsWith("cat ")) {
          const id = cmd.split(" ")[1];
          const project = PROJECTS.find((p) => p.id === id);
          response = project
            ? `${project.title}: ${project.description}`
            : `Project not found: ${id}`;
        } else {
          response = `Command not found: ${cmd}. Type "help" for assistance.`;
        }
    }

    setHistory((prev) => [
      ...prev,
      { type: "cmd", text: input },
      {
        type: "resp",
        text: Array.isArray(response) ? response.join("\n") : response,
      },
    ]);
    setInput("");
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
    <div className="bg-[#0d0d0d] text-[#00ff41] p-0 font-mono text-sm rounded-lg shadow-2xl max-w-2xl mx-auto border border-gray-800 overflow-hidden text-left">
      <div className="bg-[#1a1a1a] px-4 py-2 flex justify-between items-center border-b border-gray-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-gray-500 text-xs">mayank — zsh — 80×24</div>
        <div className="w-12" />
      </div>

      <div className="p-4">
        <div
          ref={scrollRef}
          className="h-64 overflow-y-auto mb-4 scrollbar-hide space-y-1"
        >
          <pre className="text-blue-400 leading-none mb-4">
            {`
  __  __                       _
 |  \\/  |                     | |
 | \\  / | __ _ _   _  __ _ _ _| | __
 | |\\/| |/ _\` | | | |/ _\` | '_ \\ |/ /
 | |  | | (_| | |_| | (_| | | | |   <
 |_|  |_|\\__,_|\\__, |\\__,_|_| |_|_|\\_\\
                __/ |
               |___/
`}
          </pre>
          {history.map((line, i) => (
            <div
              key={i}
              className={
                line.type === "cmd"
                  ? "text-white"
                  : "text-green-400 whitespace-pre-wrap"
              }
            >
              {line.type === "cmd" ? (
                <span className="text-blue-400 mr-2">➜</span>
              ) : null}
              {line.text}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleCommand}
          className="relative flex gap-2 items-center"
        >
          <span className="text-blue-400">➜</span>
          <span className="text-yellow-400">~</span>
          <div className="relative flex-1">
            {suggestion && (
              <div className="absolute inset-0 pointer-events-none text-gray-600">
                {suggestion}
              </div>
            )}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none w-full text-white caret-blue-400 relative z-10"
              autoFocus
            />
          </div>
          {suggestion && (
            <span className="text-[10px] text-gray-500 animate-pulse">
              Tab to complete
            </span>
          )}
        </form>
      </div>
    </div>
  );
};
