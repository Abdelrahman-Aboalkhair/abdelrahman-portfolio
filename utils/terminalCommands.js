import {
  userData,
  projects,
  skills,
  services,
  aboutContent,
} from "../data/terminalData";

// Terminal command definitions
export const createCommands = (setHistory) => ({
  help: () => [
    "Available commands:",
    "",
    "  whoami       - Display user information",
    "  projects     - Show recent projects",
    "  services     - Show services offered",
    "  skills       - List technical skills",
    "  contact      - Get contact information",
    "  about        - Learn more about me",
    "  clear        - Clear terminal",
    "  help         - Show this help message",
    "",
  ],

  whoami: () => [
    `${userData.name}`,
    `${userData.title}`,
    `Location: ${userData.location}`,
    `Experience: ${userData.experience}`,
    `Specialization: ${userData.specialization}`,
    "",
  ],

  projects: () => [
    "Recent Projects:",
    "",
    ...projects
      .map((project, i) => [
        `${i + 1}. ${project.name}`,
        `   Tech: ${project.tech}`,
        `   ${project.description}`,
        "",
      ])
      .flat(),
  ],

  services: () => [
    "Services Offered:",
    "",
    ...services.map((service) => `• ${service}`),
    "",
  ],

  skills: () => [
    "Technical Skills:",
    "",
    "Frontend:",
    ...skills.frontend.map((skill) => `  • ${skill}`),
    "",
    "Backend:",
    ...skills.backend.map((skill) => `  • ${skill}`),
    "",
    "Tools & Others:",
    ...skills.tools.map((skill) => `  • ${skill}`),
    "",
  ],

  contact: () => [
    "Contact Information:",
    "",
    `Email: ${userData.email}`,
    `GitHub: ${userData.github}`,
    `LinkedIn: ${userData.linkedin}`,
    "",
    "Feel free to reach out for collaboration or opportunities!",
    "",
  ],

  about: () => ["About Me:", "", ...aboutContent, ""],

  clear: () => {
    setHistory([]);
    return [];
  },
});

// Execute a terminal command
export const executeCommand = (cmd, commands, setHistory) => {
  const command = cmd.toLowerCase().trim();
  const timestamp = new Date().toLocaleTimeString();

  // Add command to history
  const commandEntry = {
    type: "command",
    content: `user@portfolio:~$ ${cmd}`,
    timestamp,
  };

  if (commands[command]) {
    const output = commands[command]();
    if (command === "clear") {
      return;
    }

    const outputEntry = {
      type: "output",
      content: output,
      timestamp,
    };

    setHistory((prev) => [...prev, commandEntry, outputEntry]);
  } else {
    const errorEntry = {
      type: "error",
      content: [
        `Command '${cmd}' not found.`,
        "Type 'help' for available commands.",
        "",
      ],
      timestamp,
    };

    setHistory((prev) => [...prev, commandEntry, errorEntry]);
  }
};

// Get command suggestions for tab completion
export const getCommandSuggestions = (input, commands) => {
  const availableCommands = Object.keys(commands);
  return availableCommands.filter((cmd) => cmd.startsWith(input.toLowerCase()));
};
