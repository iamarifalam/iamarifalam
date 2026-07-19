/* ==========================================
   PARTICLES SYSTEM BACKDROP
   ========================================== */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const particleCount = 65;
const connectionDistance = 110;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.4 - 0.2;
    this.speedY = Math.random() * 0.4 - 0.2;
    this.color = 'rgba(0, 242, 254, 0.15)';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];
  for (let i = 0; i < particleCount; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < connectionDistance) {
        const opacity = (1 - dist / connectionDistance) * 0.12;
        ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Start particles
initParticles();
animateParticles();

/* ==========================================
   NAVIGATION EFFECT
   ========================================== */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const hero = document.getElementById('hero');
  const heroHeight = hero ? hero.clientHeight : 500;
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  if (window.scrollY > (heroHeight - 70)) {
    document.body.classList.add('scrolled-past-hero');
  } else {
    document.body.classList.remove('scrolled-past-hero');
  }
});

/* ==========================================
   HERO TERMINAL TYPEWRITER EFFECT
   ========================================== */
const typewriterPhrases = [
  "building real-world intelligent systems.",
  "designing scalable LangGraph cognitive loops.",
  "orchestrating production-grade MLOps pipelines.",
  "simplifying complex AI systems for millions."
];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;
const typewriterSpeed = 80;
const typewriterDeleteSpeed = 40;
const typewriterDelayBetween = 2000;
const typewriterElement = document.getElementById('typewriter-text');

function runTypewriter() {
  const currentPhrase = typewriterPhrases[phraseIndex];
  
  if (isDeleting) {
    typewriterElement.textContent = currentPhrase.substring(0, letterIndex - 1);
    letterIndex--;
  } else {
    typewriterElement.textContent = currentPhrase.substring(0, letterIndex + 1);
    letterIndex++;
  }

  if (!isDeleting && letterIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(runTypewriter, typewriterDelayBetween);
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
    setTimeout(runTypewriter, 500);
  } else {
    setTimeout(runTypewriter, isDeleting ? typewriterDeleteSpeed : typewriterSpeed);
  }
}

if (typewriterElement) {
  runTypewriter();
}

/* ==========================================
   TIMELINE FILTERING
   ========================================== */
const btnAll = document.getElementById('btn-filter-all');
const btnExp = document.getElementById('btn-filter-exp');
const btnEdu = document.getElementById('btn-filter-edu');
const timelineItems = document.querySelectorAll('.timeline-item');

function filterTimeline(category) {
  timelineItems.forEach(item => {
    if (category === 'all') {
      item.classList.remove('hidden');
    } else if (item.classList.contains(category)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

if (btnAll && btnExp && btnEdu) {
  btnAll.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    btnAll.classList.add('active');
    filterTimeline('all');
  });
  
  btnExp.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    btnExp.classList.add('active');
    filterTimeline('exp');
  });
  
  btnEdu.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    btnEdu.classList.add('active');
    filterTimeline('edu');
  });
}

/* ==========================================
   MOBILE NAVIGATION TOGGLE
   ========================================== */
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'rgba(3, 7, 18, 0.95)';
    navLinks.style.padding = '2rem';
    navLinks.style.borderBottom = '1px solid var(--glass-border)';
  });
}

/* ==========================================
   INTERACTIVE AI LAB (LANGGRAPH SIMULATOR)
   ========================================== */
let activeChallenge = 1;
let nodes = [];
let links = [];
let drawingFromNode = null;
let isRunning = false;

const canvasContainer = document.getElementById('canvas-container');
const nodesContainer = document.getElementById('nodes-container');
const canvasSvg = document.getElementById('canvas-svg');
const consoleLogBody = document.getElementById('console-log-body');
const consoleStateData = document.getElementById('console-state-data');
const pipelineStatus = document.getElementById('pipeline-status');

// Node definitions templates
const NODE_TEMPLATES = {
  input: { label: "User Input", desc: "System query start", type: "input", color: "var(--accent-blue)" },
  rag: { label: "Vector DB", desc: "Retrieve context facts", type: "rag", color: "var(--accent-violet)" },
  llm: { label: "LLM Gen", desc: "Generate response text", type: "llm", color: "var(--accent-cyan)" },
  guard: { label: "Guardrail", desc: "Audit safety criteria", type: "guardrail", color: "var(--accent-violet)" },
  output: { label: "Response", desc: "Deliver end output", type: "output", color: "#10b981" },
  coder: { label: "Coder Agent", desc: "Write program files", type: "llm", color: "var(--accent-cyan)" },
  tester: { label: "Unit Tester", desc: "Run python tests", type: "guardrail", color: "var(--accent-violet)" }
};

// Preset locations based on active Challenge
const CHALLENGES = {
  1: {
    title: "Safe RAG Route",
    goal: "Goal: Route query -> Retrieve context facts -> LLM generation -> Safety Guardrail check -> Deliver Output.",
    nodes: [
      { id: "input", templateKey: "input", x: 40, y: 180 },
      { id: "rag", templateKey: "rag", x: 200, y: 80 },
      { id: "llm", templateKey: "llm", x: 200, y: 280 },
      { id: "guard", templateKey: "guard", x: 380, y: 180 },
      { id: "output", templateKey: "output", x: 540, y: 180 }
    ],
    links: [
      // Starts disconnected for user to build, or we can add a few helper connections
    ]
  },
  2: {
    title: "Self-Correcting Coder",
    goal: "Goal: Build Input -> Coder -> Tester -> Output, AND a feedback loop from Tester back to Coder for self-healing.",
    nodes: [
      { id: "input", templateKey: "input", x: 50, y: 180 },
      { id: "coder", templateKey: "coder", x: 200, y: 180 },
      { id: "tester", templateKey: "tester", x: 360, y: 180 },
      { id: "output", templateKey: "output", x: 540, y: 180 }
    ],
    links: []
  },
  3: {
    title: "Custom Sandbox",
    goal: "Goal: Add nodes from library, drag to place, connect ports, and test custom agent topologies.",
    nodes: [
      { id: "input", templateKey: "input", x: 50, y: 180 },
      { id: "output", templateKey: "output", x: 540, y: 180 }
    ],
    links: []
  }
};

// Initialize sandbox workspace
function initLab() {
  loadChallenge(activeChallenge);
  populateNodeLibrary();
}

function loadChallenge(id) {
  activeChallenge = id;
  isRunning = false;
  drawingFromNode = null;
  
  pipelineStatus.textContent = "Idle";
  pipelineStatus.className = "canvas-status";
  
  const challenge = CHALLENGES[id];
  
  // Clone nodes preset
  nodes = challenge.nodes.map(n => ({
    id: n.id,
    x: n.x,
    y: n.y,
    ...NODE_TEMPLATES[n.templateKey]
  }));
  
  // Clone links preset
  links = [...challenge.links];
  
  // Reset logs
  consoleLogBody.innerHTML = `
    <div class="console-line system">[System] Loaded challenge: ${challenge.title}</div>
    <div class="console-line info">${challenge.goal}</div>
    <div class="console-line system">[System] Click on an Out-Port (right dot) and then an In-Port (left dot) to link nodes. Click a line to delete it.</div>
  `;
  updateStateDisplay({});
  
  renderWorkspace();
}

function populateNodeLibrary() {
  const libList = document.getElementById('node-lib-list');
  if (!libList) return;
  libList.innerHTML = '';
  
  Object.entries(NODE_TEMPLATES).forEach(([key, value]) => {
    // Only display non-start/end nodes in picker for customization
    if (key === 'input' || key === 'output') return;
    
    const item = document.createElement('div');
    item.className = 'node-picker-item';
    item.innerHTML = `
      <span>${value.label}</span>
      <button class="node-picker-btn" data-key="${key}" title="Add Node">+</button>
    `;
    libList.appendChild(item);
  });
  
  // Add listeners to picker buttons
  document.querySelectorAll('.node-picker-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (activeChallenge !== 3) {
        alert("Node library editing is only supported in Custom Sandbox mode!");
        return;
      }
      const key = e.target.getAttribute('data-key');
      const uniqueId = key + '_' + Math.floor(Math.random() * 1000);
      
      nodes.push({
        id: uniqueId,
        x: 250,
        y: 180,
        ...NODE_TEMPLATES[key]
      });
      
      printLog(`[System] Spawned node: ${NODE_TEMPLATES[key].label}`, 'system');
      renderWorkspace();
    });
  });
}

function printLog(text, type = 'system') {
  const line = document.createElement('div');
  line.className = `console-line ${type}`;
  line.textContent = text;
  consoleLogBody.appendChild(line);
  consoleLogBody.scrollTop = consoleLogBody.scrollHeight;
}

function updateStateDisplay(dataObj) {
  consoleStateData.textContent = JSON.stringify(dataObj, null, 2);
}

// Draw nodes and SVG connections
function renderWorkspace() {
  // 1. Draw HTML Nodes
  nodesContainer.innerHTML = '';
  
  nodes.forEach(node => {
    const nodeEl = document.createElement('div');
    nodeEl.className = 'agent-node';
    nodeEl.id = `node_${node.id}`;
    nodeEl.style.left = `${node.x}px`;
    nodeEl.style.top = `${node.y}px`;
    nodeEl.style.setProperty('--node-color', node.color);
    
    // Header
    const header = document.createElement('div');
    header.className = 'node-title-bar';
    header.innerHTML = `<span>${node.label}</span>`;
    nodeEl.appendChild(header);
    
    // Desc
    const desc = document.createElement('div');
    desc.className = 'node-desc';
    desc.textContent = node.desc;
    nodeEl.appendChild(desc);
    
    // Port In (if not input node)
    if (node.type !== 'input') {
      const portIn = document.createElement('div');
      portIn.className = 'port port-in';
      portIn.setAttribute('data-node-id', node.id);
      portIn.addEventListener('click', (e) => handlePortInClick(node.id));
      nodeEl.appendChild(portIn);
    }
    
    // Port Out (if not output node)
    if (node.type !== 'output') {
      const portOut = document.createElement('div');
      portOut.className = 'port port-out';
      portOut.setAttribute('data-node-id', node.id);
      portOut.addEventListener('click', (e) => handlePortOutClick(node.id));
      nodeEl.appendChild(portOut);
    }
    
    // Drag functionality on header
    header.addEventListener('mousedown', (e) => {
      if (isRunning) return;
      e.preventDefault();
      
      const startX = e.clientX;
      const startY = e.clientY;
      const origX = node.x;
      const origY = node.y;
      
      function onMouseMove(moveEvent) {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        
        // Boundaries checks
        node.x = Math.max(10, Math.min(canvasContainer.clientWidth - 150, origX + dx));
        node.y = Math.max(10, Math.min(canvasContainer.clientHeight - 80, origY + dy));
        
        nodeEl.style.left = `${node.x}px`;
        nodeEl.style.top = `${node.y}px`;
        drawConnections();
      }
      
      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
    
    nodesContainer.appendChild(nodeEl);
  });
  
  // 2. Draw connections
  drawConnections();
}

// Calculate connector coordinates and draw links
function drawConnections() {
  // Clear path tags
  const existingPaths = canvasSvg.querySelectorAll('.connection-line, .path-pulse');
  existingPaths.forEach(p => p.remove());
  
  links.forEach((link, idx) => {
    const fromNode = nodes.find(n => n.id === link.from);
    const toNode = nodes.find(n => n.id === link.to);
    
    if (!fromNode || !toNode) return;
    
    // Out port coord: Right middle edge
    const x1 = fromNode.x + 140; // width of node
    const y1 = fromNode.y + 40;  // approximate center height
    
    // In port coord: Left middle edge
    const x2 = toNode.x;
    const y2 = toNode.y + 40;
    
    // Draw Bezier Curve path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const controlOffset = Math.abs(x2 - x1) * 0.4;
    const d = `M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${x2 - controlOffset} ${y2}, ${x2} ${y2}`;
    
    path.setAttribute('d', d);
    path.setAttribute('class', 'connection-line');
    path.setAttribute('id', `link_${link.from}_to_${link.to}`);
    path.style.cursor = 'pointer';
    
    // Allow deleting line on click
    path.addEventListener('click', () => {
      if (isRunning) return;
      links.splice(idx, 1);
      printLog(`[System] Deleted connection from ${fromNode.label} to ${toNode.label}`, 'system');
      drawConnections();
    });
    
    canvasSvg.appendChild(path);
  });
}

function handlePortOutClick(nodeId) {
  if (isRunning) return;
  drawingFromNode = nodeId;
  const nodeObj = nodes.find(n => n.id === nodeId);
  printLog(`[System] Connection started from Out-Port of ${nodeObj.label}... Click on an In-Port to connect.`, 'system');
}

function handlePortInClick(nodeId) {
  if (isRunning) return;
  if (!drawingFromNode) {
    printLog(`[System] Error: You must click an Out-Port (right) first!`, 'error');
    return;
  }
  
  if (drawingFromNode === nodeId) {
    printLog(`[System] Error: Cannot connect a node to itself!`, 'error');
    drawingFromNode = null;
    return;
  }
  
  // Check if link already exists
  const exists = links.some(l => l.from === drawingFromNode && l.to === nodeId);
  if (exists) {
    printLog(`[System] Connection already exists!`, 'warning');
    drawingFromNode = null;
    return;
  }
  
  links.push({ from: drawingFromNode, to: nodeId });
  const fromNode = nodes.find(n => n.id === drawingFromNode);
  const toNode = nodes.find(n => n.id === nodeId);
  printLog(`[System] Connected ${fromNode.label} → ${toNode.label}`, 'success');
  
  drawingFromNode = null;
  drawConnections();
}

// Reset challenge workspace
const btnReset = document.getElementById('btn-reset-pipeline');
if (btnReset) {
  btnReset.addEventListener('click', () => {
    loadChallenge(activeChallenge);
  });
}

// Setup challenge select events
document.getElementById('btn-challenge-1').addEventListener('click', (e) => {
  document.querySelectorAll('.challenge-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('btn-challenge-1').classList.add('active');
  loadChallenge(1);
});

document.getElementById('btn-challenge-2').addEventListener('click', (e) => {
  document.querySelectorAll('.challenge-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('btn-challenge-2').classList.add('active');
  loadChallenge(2);
});

document.getElementById('btn-challenge-3').addEventListener('click', (e) => {
  document.querySelectorAll('.challenge-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('btn-challenge-3').classList.add('active');
  loadChallenge(3);
});

document.getElementById('btn-clear-console').addEventListener('click', () => {
  consoleLogBody.innerHTML = '';
});

/* ==========================================
   PIPELINE SIMULATION ENGINE (RUNNER)
   ========================================== */
const btnRun = document.getElementById('btn-run-pipeline');

if (btnRun) {
  btnRun.addEventListener('click', async () => {
    if (isRunning) return;
    isRunning = true;
    
    // UI Updates
    btnRun.disabled = true;
    pipelineStatus.textContent = "Running";
    pipelineStatus.className = "canvas-status running";
    
    // Clear all node status classes
    document.querySelectorAll('.agent-node').forEach(node => {
      node.classList.remove('node-active', 'node-success', 'node-error');
    });
    
    printLog("=============================", 'system');
    printLog("[Engine] Starting Pipeline Execution...", 'info');
    
    // Check if input node is linked to anything
    const hasStart = links.some(l => l.from === 'input');
    if (!hasStart) {
      printLog("[Engine] Fatal: 'User Input' (Start node) is not connected to any node!", 'error');
      endSimulation(false);
      return;
    }
    
    // Simulation variables
    let state = {
      query: activeChallenge === 2 ? "Write a python math function" : "Describe Azure cloud costs metrics",
      facts_retrieved: false,
      response_generated: false,
      code_passed: false,
      iterations: 0
    };
    updateStateDisplay(state);
    
    // Run simulation steps
    const success = await simulateSteps('input', state);
    endSimulation(success);
  });
}

function endSimulation(success) {
  isRunning = false;
  btnRun.disabled = false;
  
  if (success) {
    pipelineStatus.textContent = "Completed";
    pipelineStatus.className = "canvas-status completed";
    printLog("[Engine] Pipeline Executed Successfully! Challenge Cleared. 🎉", 'success');
  } else {
    pipelineStatus.textContent = "Failed";
    pipelineStatus.className = "canvas-status error";
    printLog("[Engine] Pipeline Execution Terminated. Challenge Failed. ❌", 'error');
  }
}

// Recursive/Iterative simulation step with delay
async function simulateSteps(currentNodeId, state) {
  const nodeObj = nodes.find(n => n.id === currentNodeId);
  if (!nodeObj) return false;
  
  // Highlight node
  const nodeEl = document.getElementById(`node_${currentNodeId}`);
  if (nodeEl) nodeEl.classList.add('node-active');
  
  // Process Node Logic
  await processNodeLogic(nodeObj, state);
  updateStateDisplay(state);
  
  // Wait delay
  await delay(1200);
  
  // Clear highlighting
  if (nodeEl) nodeEl.classList.remove('node-active');
  
  // Find outgoing links
  const outgoingLinks = links.filter(l => l.from === currentNodeId);
  
  if (outgoingLinks.length === 0) {
    if (nodeObj.type === 'output') {
      // Reached End! Validate Challenge conditions
      return validateEndState(state);
    } else {
      printLog(`[Engine] Path ended at node: ${nodeObj.label}. Output target not reached!`, 'error');
      if (nodeEl) nodeEl.classList.add('node-error');
      return false;
    }
  }
  
  // Animate path pulses and execute children
  // For simplicity, follow first path in case of branching, unless it is Challenge 2 logic
  let nextLink = outgoingLinks[0];
  
  // Challenge 2 Branching logic (Tester branching output vs repeat coder loop)
  if (nodeObj.id === 'tester') {
    state.iterations++;
    if (state.iterations < 2) {
      // Simulate failed coder loop on first test attempt
      printLog("[Unit Tester] Status Code: 500. SyntaxError found. Routing back to Coder Agent.", 'warning');
      state.code_passed = false;
      
      const loopLink = outgoingLinks.find(l => l.to === 'coder');
      if (loopLink) {
        nextLink = loopLink;
      } else {
        printLog("[Unit Tester] Critical: Code failed but no feedback link back to 'Coder Agent' exists!", 'error');
        if (nodeEl) nodeEl.classList.add('node-error');
        return false;
      }
    } else {
      // Simulate pass on second attempt
      printLog("[Unit Tester] Status Code: 200. All unit tests passed! Routing to Production output.", 'success');
      state.code_passed = true;
      const successLink = outgoingLinks.find(l => l.to === 'output');
      if (successLink) {
        nextLink = successLink;
      } else {
        printLog("[Unit Tester] Critical: Code passed but no connection to Output node exists!", 'error');
        if (nodeEl) nodeEl.classList.add('node-error');
        return false;
      }
    }
  }
  
  // Draw pulse animation on active path
  const pathId = `link_${nextLink.from}_to_${nextLink.to}`;
  const pathEl = document.getElementById(pathId);
  if (pathEl) {
    pathEl.classList.add('active-path');
    await animatePulseAlongPath(pathEl);
    pathEl.classList.remove('active-path');
  }
  
  return await simulateSteps(nextLink.to, state);
}

async function processNodeLogic(node, state) {
  printLog(`[Node] Executing ${node.label}...`, 'system');
  
  switch (node.type) {
    case 'input':
      printLog(`[User Input] Trigger Query: "${state.query}"`, 'info');
      break;
    case 'rag':
      state.facts_retrieved = true;
      printLog("[Vector DB] Scanned similarity indexes. Extracted pricing context meta...", 'success');
      break;
    case 'llm':
      if (node.id === 'coder') {
        printLog(state.iterations === 0 
          ? "[Coder Agent] Generating code script (v1.0)..." 
          : "[Coder Agent] Analyzing error feedback logs. Correcting syntax typos (v2.0)...", 'info');
      } else {
        state.response_generated = true;
        if (state.facts_retrieved) {
          printLog("[LLM Gen] Processing query with fetched context facts. Synthesizing safe answer summary...", 'success');
        } else {
          printLog("[LLM Gen] Warning: No database context facts retrieved! Generating response based on raw weights...", 'warning');
        }
      }
      break;
    case 'guardrail':
      if (node.id === 'tester') {
        printLog("[Unit Tester] Compiling script code. Running local test suites...", 'info');
      } else {
        printLog("[Guardrail] Performing PII check, prompt injection safety scans, and factual alignment audit...", 'info');
        if (state.facts_retrieved && state.response_generated) {
          printLog("[Guardrail] Audit Success: Facts aligned and output meets safety standards.", 'success');
          state.safe_checked = true;
        } else {
          printLog("[Guardrail] Audit Warn: Factual alignment evaluation failed (Missing retrieved details).", 'warning');
          state.safe_checked = false;
        }
      }
      break;
    case 'output':
      printLog("[Response] Rendering final output block to viewport.", 'success');
      break;
  }
}

function validateEndState(state) {
  if (activeChallenge === 1) {
    // Need facts retrieved, response generated, and safety checked
    if (!state.facts_retrieved) {
      printLog("[Validation] Failure: System hallucination risk! No context facts were retrieved from the database.", 'error');
      return false;
    }
    if (!state.response_generated) {
      printLog("[Validation] Failure: The LLM Generator was not included in the pipeline.", 'error');
      return false;
    }
    if (!state.safe_checked) {
      printLog("[Validation] Failure: Safety Guardrails were not run on the final LLM text.", 'error');
      return false;
    }
    printLog("[Validation] Success: Pipeline structure meets RAG safety guidelines!", 'success');
    return true;
  }
  
  if (activeChallenge === 2) {
    if (state.iterations < 2 || !state.code_passed) {
      printLog("[Validation] Failure: Code did not pass validation check or feedback loop wasn't traversed.", 'error');
      return false;
    }
    printLog("[Validation] Success: Agent successfully recovered and healed failed script tests!", 'success');
    return true;
  }
  
  // Custom sandbox just needs to reach output successfully
  printLog("[Validation] Success: Custom workspace workflow executed fully.", 'success');
  return true;
}

// Animate a glowing circle along the SVG connection path
function animatePulseAlongPath(pathEl) {
  return new Promise((resolve) => {
    const pulseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    pulseCircle.setAttribute('class', 'path-pulse');
    canvasSvg.appendChild(pulseCircle);
    
    const pathLength = pathEl.getTotalLength();
    const duration = 800; // ms
    let startTime = null;
    
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      
      const point = pathEl.getPointAtLength(percent * pathLength);
      pulseCircle.setAttribute('cx', point.x);
      pulseCircle.setAttribute('cy', point.y);
      
      if (percent < 1) {
        requestAnimationFrame(step);
      } else {
        pulseCircle.remove();
        resolve();
      }
    }
    
    requestAnimationFrame(step);
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Launch application on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  initLab();
  initHeroTabs();
  initAvatarParticles();
  initGameMode();
});

/* ==========================================
   HERO TABS SWITCHER
   ========================================== */
function initHeroTabs() {
  const tabAvatarBtn = document.getElementById('tab-avatar-btn');
  const tabTerminalBtn = document.getElementById('tab-terminal-btn');
  const panelAvatar = document.getElementById('panel-avatar');
  const panelTerminal = document.getElementById('panel-terminal');
  
  if (tabAvatarBtn && tabTerminalBtn && panelAvatar && panelTerminal) {
    tabAvatarBtn.addEventListener('click', () => {
      tabAvatarBtn.classList.add('active');
      tabTerminalBtn.classList.remove('active');
      panelAvatar.classList.add('active');
      panelTerminal.classList.remove('active');
    });
    
    tabTerminalBtn.addEventListener('click', () => {
      tabTerminalBtn.classList.add('active');
      tabAvatarBtn.classList.remove('active');
      panelTerminal.classList.add('active');
      panelAvatar.classList.remove('active');
    });
  }
}

/* ==========================================
   ASCII PORTRAIT ENGINE (Gazi-inspired)
   Pre-computed particles with shimmer, spring physics, and mouse repulsion
   ========================================== */
function initAvatarParticles() {
  const avatarCanvas = document.getElementById('avatar-canvas');
  if (!avatarCanvas) return;
  
  // Check if pre-computed ASCII data exists
  if (typeof ASCII_PARTICLES === 'undefined' || !ASCII_PARTICLES.length) {
    console.warn('ASCII_PARTICLES data not found. Run extract_ascii.py first.');
    return;
  }
  
  const ctxAvatar = avatarCanvas.getContext('2d');
  const DPR = window.devicePixelRatio || 1;
  const CANVAS_SIZE = 400;
  
  // Set retina dimensions
  avatarCanvas.width = CANVAS_SIZE * DPR;
  avatarCanvas.height = CANVAS_SIZE * DPR;
  avatarCanvas.style.width = CANVAS_SIZE + 'px';
  avatarCanvas.style.height = CANVAS_SIZE + 'px';
  ctxAvatar.scale(DPR, DPR);
  
  // Mouse state with smooth interpolation
  const mouse = { x: -1000, y: -1000, active: false };
  const mouseTarget = { x: -1000, y: -1000 };
  const MOUSE_SMOOTH = 0.3;
  const MOUSE_RADIUS = 55;
  const MOUSE_FORCE = 8;
  
  // Spring physics
  const SPRING = 0.045;
  const FRICTION = 0.92;
  
  // Create particles from pre-computed data
  const startTime = performance.now();
  const particles = ASCII_PARTICLES.map((p, i) => ({
    x: p.x + (Math.random() - 0.5) * 500,
    y: p.y + (Math.random() - 0.5) * 500,
    targetX: p.x,
    targetY: p.y,
    vx: 0,
    vy: 0,
    char: p.char,
    r: p.r,
    g: p.g,
    b: p.b,
    baseAlpha: p.alpha,
    currentAlpha: 0,
    delay: Math.random() * 0.6,
    shimmer: Math.random() * Math.PI * 2,
    fontSize: 6,
  }));
  
  // Canvas mouse tracking
  avatarCanvas.addEventListener('mousemove', (e) => {
    const rect = avatarCanvas.getBoundingClientRect();
    mouseTarget.x = ((e.clientX - rect.left) / rect.width) * CANVAS_SIZE;
    mouseTarget.y = ((e.clientY - rect.top) / rect.height) * CANVAS_SIZE;
    mouse.active = true;
  });
  
  avatarCanvas.addEventListener('mouseleave', () => {
    mouse.active = false;
  });
  
  // Touch support
  avatarCanvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const rect = avatarCanvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouseTarget.x = ((touch.clientX - rect.left) / rect.width) * CANVAS_SIZE;
    mouseTarget.y = ((touch.clientY - rect.top) / rect.height) * CANVAS_SIZE;
    mouse.active = true;
  }, { passive: false });
  
  avatarCanvas.addEventListener('touchend', () => {
    mouse.active = false;
  });
  
  function drawAvatar() {
    ctxAvatar.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    const elapsed = (performance.now() - startTime) / 1000;
    
    // Smooth mouse interpolation
    if (mouse.active) {
      mouse.x += (mouseTarget.x - mouse.x) * MOUSE_SMOOTH;
      mouse.y += (mouseTarget.y - mouse.y) * MOUSE_SMOOTH;
    } else {
      mouse.x += (-1000 - mouse.x) * 0.08;
      mouse.y += (-1000 - mouse.y) * 0.08;
    }
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Staggered fade-in
      const fadeProgress = Math.min(1, Math.max(0, (elapsed - p.delay) / 0.8));
      p.currentAlpha = p.baseAlpha * fadeProgress;
      
      if (p.currentAlpha <= 0.01) continue;
      
      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
        const angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * force * MOUSE_FORCE;
        p.vy += Math.sin(angle) * force * MOUSE_FORCE;
      }
      
      // Spring back to origin
      p.vx += (p.targetX - p.x) * SPRING;
      p.vy += (p.targetY - p.y) * SPRING;
      
      // Friction
      p.vx *= FRICTION;
      p.vy *= FRICTION;
      
      // Update position
      p.x += p.vx;
      p.y += p.vy;
      
      // Shimmer effect
      const shimmerAlpha = p.currentAlpha * (0.85 + 0.15 * Math.sin(elapsed * 2.5 + p.shimmer));
      
      // Render
      ctxAvatar.globalAlpha = shimmerAlpha;
      ctxAvatar.fillStyle = `rgb(${p.r}, ${p.g}, ${p.b})`;
      ctxAvatar.font = `bold ${p.fontSize}px monospace`;
      ctxAvatar.fillText(p.char, p.x, p.y);
    }
    
    ctxAvatar.globalAlpha = 1;
    requestAnimationFrame(drawAvatar);
  }
  
  // Start animation
  requestAnimationFrame(drawAvatar);
}

/* ==========================================
   PIXEL-ART PLATFORMER GAME (Gazi-inspired)
   Full canvas overlay with pixel-art robot, blocks, and brain cells
   ========================================== */
const GAME = {
  active: false,
  loopId: null,
  canvas: null,
  ctx: null,
  scrollY: 0,
  frame: 0,
  score: 0,
  totalCells: 5,
  keys: {},
  // Player
  player: {
    x: 0, y: 0, vx: 0, vy: 0,
    onGround: false, isIdle: true, facingRight: true,
  },
  // Constants
  SCALE: 2,
  PX_W: 12,
  PX_H: 16,
  GRAVITY: 0.22,
  JUMP: -7,
  MAX_SPEED: 1.8,
  FRICTION: 0.82,
  BLOCK_H: 8,
  // Arrays
  blocks: [],
  cells: [],
  enemies: [],
  particles: [],
};

function initGameMode() {
  const toggleBtn = document.getElementById('btn-toggle-game');
  if (!toggleBtn) return;
  toggleBtn.addEventListener('click', () => {
    GAME.active ? stopGame() : startGame();
  });
}

function startGame() {
  GAME.active = true;
  GAME.score = 0;
  GAME.frame = 0;
  GAME.keys = {};
  
  // Button
  const btn = document.getElementById('btn-toggle-game');
  btn.innerHTML = '❌ Exit Game';
  btn.classList.add('game-active-btn');
  
  // Create canvas overlay
  const c = document.createElement('canvas');
  c.id = 'game-canvas';
  c.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 900;
    image-rendering: pixelated;
  `;
  document.body.appendChild(c);
  GAME.canvas = c;
  GAME.ctx = c.getContext('2d');
  resizeGameCanvas();
  
  // HUD
  const hud = document.createElement('div');
  hud.id = 'game-hud';
  hud.innerHTML = `
    <div class="game-hud-inner">
      <span class="game-hud-controls">⌨️ A/D or ←/→ to move &nbsp;|&nbsp; SPACE/W to jump</span>
      <span class="game-hud-score" id="game-score">🪙 0 / ${GAME.totalCells}</span>
    </div>
  `;
  document.body.appendChild(hud);
  
  // Spawn player near top of visible area
  GAME.scrollY = window.scrollY;
  GAME.player.x = window.innerWidth / 2 - 16;
  GAME.player.y = GAME.scrollY + 200;
  GAME.player.vx = 0;
  GAME.player.vy = 0;
  GAME.player.onGround = false;
  
  // Generate blocks and cells
  generateGameWorld();
  
  // Listeners
  window.addEventListener('keydown', gameKeyDown);
  window.addEventListener('keyup', gameKeyUp);
  window.addEventListener('resize', resizeGameCanvas);
  
  // Start loop
  GAME.loopId = requestAnimationFrame(gameLoop);
}

function stopGame() {
  GAME.active = false;
  if (GAME.loopId) cancelAnimationFrame(GAME.loopId);
  
  const btn = document.getElementById('btn-toggle-game');
  btn.innerHTML = '🎮 Play Game';
  btn.classList.remove('game-active-btn');
  
  const c = document.getElementById('game-canvas');
  if (c) c.remove();
  const h = document.getElementById('game-hud');
  if (h) h.remove();
  
  window.removeEventListener('keydown', gameKeyDown);
  window.removeEventListener('keyup', gameKeyUp);
  window.removeEventListener('resize', resizeGameCanvas);
}

function resizeGameCanvas() {
  if (!GAME.canvas) return;
  GAME.canvas.width = window.innerWidth;
  GAME.canvas.height = window.innerHeight;
}

function gameKeyDown(e) {
  GAME.keys[e.key] = true;
  if (['ArrowUp','ArrowDown',' ','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
}
function gameKeyUp(e) { GAME.keys[e.key] = false; }

function generateGameWorld() {
  GAME.blocks = [];
  GAME.cells = [];
  
  const vw = window.innerWidth;
  const pageH = document.body.scrollHeight;
  const navBottom = document.getElementById('navbar')?.getBoundingClientRect().bottom || 70;
  const startY = window.scrollY + navBottom + 100;
  
  // Read real DOM card positions as platform anchors
  const cardEls = document.querySelectorAll(
    '.about-card, .stat-box, .skills-card, .project-card, .timeline-content, .cert-card, .youtube-glow-box, .contact-card, .visual-card-wrapper'
  );
  
  const cardRects = [];
  cardEls.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > 30 && r.height > 20) {
      cardRects.push({
        x: r.left + window.scrollX,
        y: r.top + window.scrollY,
        w: r.width,
        h: r.height
      });
    }
  });
  
  // Place blocks on top edges of cards
  cardRects.forEach(cr => {
    GAME.blocks.push({
      x: cr.x,
      docY: cr.y,
      w: cr.w,
    });
  });
  
  // Add extra stepping-stone blocks between distant cards
  for (let i = 0; i < cardRects.length - 1; i++) {
    const a = cardRects[i];
    const b = cardRects[i + 1];
    const gap = b.y - (a.y + a.h);
    if (gap > 300) {
      const midY = a.y + a.h + gap * 0.4;
      const midX = (a.x + b.x) / 2 + (Math.random() - 0.5) * 200;
      GAME.blocks.push({
        x: Math.max(20, Math.min(vw - 120, midX)),
        docY: midY,
        w: 80 + Math.random() * 60,
      });
    }
  }
  
  // Spawn a starting platform above the player
  GAME.blocks.push({
    x: GAME.player.x - 40,
    docY: GAME.player.y + 50,
    w: 120,
  });
  
  // Place brain cells on random blocks
  const shuffled = [...GAME.blocks].sort(() => Math.random() - 0.5);
  for (let i = 0; i < GAME.totalCells && i < shuffled.length; i++) {
    const bl = shuffled[i];
    GAME.cells.push({
      x: bl.x + bl.w * 0.3 + Math.random() * bl.w * 0.4,
      docY: bl.docY - 30 - Math.random() * 20,
      collected: false,
    });
  }

  // Initialize block recoil animation states
  GAME.blocks.forEach(b => {
    b.bumpY = 0;
    b.bumpVy = 0;
  });
  
  // Spawn Goombas on wide platforms
  GAME.enemies = [];
  GAME.particles = [];
  GAME.blocks.forEach(bl => {
    if (bl.w >= 100 && Math.random() > 0.4) {
      GAME.enemies.push({
        x: bl.x + bl.w * 0.2 + Math.random() * bl.w * 0.6,
        docY: bl.docY - 14,
        vx: (Math.random() > 0.5 ? 0.5 : -0.5),
        parentBlock: bl,
        width: 14,
        height: 14,
        dead: false,
        deadFrame: 0
      });
    }
  });
}

// Web Audio API Retro Sound synthesizer
function playRetroSound(type) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'jump') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(650, audioCtx.currentTime + 0.16);
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.16);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.16);
    } else if (type === 'coin') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, audioCtx.currentTime); // B5
      osc.frequency.setValueAtTime(1318.51, audioCtx.currentTime + 0.08); // E6
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'bump') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(40, audioCtx.currentTime + 0.12);
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } else if (type === 'stomp') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(70, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'victory') {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C, E, G, C, E, G
      const noteLen = 0.08;
      notes.forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.type = 'square';
        o.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * noteLen);
        g.gain.setValueAtTime(0.06, audioCtx.currentTime + idx * noteLen);
        g.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + idx * noteLen + 0.18);
        o.start(audioCtx.currentTime + idx * noteLen);
        o.stop(audioCtx.currentTime + idx * noteLen + 0.18);
      });
    }
  } catch (err) {
    console.warn('Audio Context block:', err);
  }
}

// 12x16 retro Mario sprite representation
// 0: transparent, 1: red, 2: brown, 3: skin, 4: blue, 5: yellow
const MARIO_SPRITE = [
  [0,0,0,1,1,1,1,1,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,0],
  [0,0,2,2,2,3,3,2,3,0,0,0],
  [0,2,3,2,3,3,3,2,3,3,3,0],
  [0,2,3,2,2,3,3,3,2,3,3,3],
  [0,2,2,3,3,3,3,2,2,2,2,0],
  [0,0,0,3,3,3,3,3,3,3,0,0],
  [0,0,1,1,4,1,1,1,1,0,0,0],
  [0,1,1,1,4,1,1,4,1,1,1,0],
  [1,1,1,1,4,4,4,4,1,1,1,1],
  [3,3,1,4,5,4,4,5,4,1,3,3],
  [3,3,3,4,4,4,4,4,4,3,3,3],
  [3,3,4,4,4,4,4,4,4,4,3,3],
  [0,0,4,4,4,0,0,4,4,4,0,0],
  [0,2,2,2,0,0,0,0,2,2,2,0],
  [2,2,2,2,0,0,0,0,2,2,2,2]
];

function drawPixelMario(ctx, x, y, frame, onGround, isIdle, facingRight) {
  const S = GAME.SCALE;
  const colors = {
    1: '#e52521', // Red
    2: '#754c24', // Brown
    3: '#fec3ac', // Skin
    4: '#002fa7', // Blue
    5: '#fcc111'  // Yellow
  };
  
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  
  if (!facingRight) {
    ctx.scale(-1, 1);
    ctx.translate(-12 * S, 0); // 12 columns wide
  }
  
  ctx.scale(S, S);
  
  // Basic walking animations by shifting rows 13-15
  const isWalking = !isIdle && onGround;
  const walkFrame = isWalking ? Math.floor(frame / 6) % 2 : 0;
  
  for (let row = 0; row < 16; row++) {
    for (let col = 0; col < 12; col++) {
      let colorIdx = MARIO_SPRITE[row][col];
      
      // Animate legs when walking
      if (row >= 13 && isWalking && walkFrame === 1) {
        let newCol = (col + 1) % 12;
        colorIdx = MARIO_SPRITE[row][newCol];
      }
      
      if (colorIdx > 0) {
        ctx.fillStyle = colors[colorIdx];
        ctx.fillRect(col, row, 1, 1);
      }
    }
  }
  
  ctx.restore();
}

function drawGameBlock(ctx, bx, by, bw, bumpY = 0) {
  const BH = GAME.BLOCK_H;
  ctx.save();
  ctx.translate(0, bumpY); // Apply vertical recoil bounce
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(bx + 2, by + BH, bw - 2, 3);
  
  ctx.fillStyle = '#b84418';
  ctx.fillRect(bx, by, bw, BH);
  
  ctx.fillStyle = '#000000';
  ctx.fillRect(bx, by + BH - 2, bw, 2);
  ctx.fillRect(bx, by + 2, bw, 1);
  
  for (let x = bx; x < bx + bw; x += 16) {
    ctx.fillRect(x, by, 1, 3);
    ctx.fillRect(x + 8, by + 3, 1, 3);
  }
  
  ctx.fillStyle = '#f87858';
  ctx.fillRect(bx, by, bw, 1);
  
  ctx.restore();
}

function drawGoldCoin(ctx, cx, cy, idx) {
  const t = Date.now() * 0.005 + idx * 0.7;
  const bob = Math.sin(t * 0.5) * 3;
  const xRadius = Math.abs(Math.sin(t)) * 6;
  
  ctx.save();
  ctx.translate(cx + 6, cy + 8 + bob);
  
  ctx.shadowColor = '#fcc111';
  ctx.shadowBlur = 8;
  
  ctx.fillStyle = '#fcc111';
  ctx.beginPath();
  ctx.ellipse(0, 0, xRadius + 1, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ff9900';
  ctx.beginPath();
  ctx.ellipse(0, 0, Math.max(0.1, xRadius - 1.5), 4.5, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = '#fcc111';
  ctx.fillRect(-Math.max(0.1, xRadius * 0.3), -2, Math.max(0.2, xRadius * 0.6), 4);
  
  ctx.restore();
}

// 14x14 pixel Goomba representation
// 0: transparent, 1: dark brown (#5a3d28), 2: light tan (#e5c19e), 3: black (#000000)
const GOOMBA_SPRITE = [
  [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,3,3,1,1,1,1,3,3,1,1,0],
  [1,1,1,3,3,1,1,1,1,3,3,1,1,1],
  [1,1,2,2,2,2,2,2,2,2,2,2,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,2,3,3,2,2,2,2,3,3,2,2,1],
  [0,2,2,2,2,2,3,3,2,2,2,2,2,0],
  [0,0,2,2,2,2,2,2,2,2,2,2,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,0,0,1,1,1,1,0,0],
  [0,1,1,1,1,0,0,0,0,1,1,1,1,0],
  [1,1,1,1,0,0,0,0,0,0,1,1,1,1]
];

function drawPixelGoomba(ctx, x, y, frame, dead) {
  const S = GAME.SCALE;
  const colors = {
    1: '#5a3d28', // Dark brown
    2: '#e5c19e', // Light tan
    3: '#000000'  // Black
  };
  
  ctx.save();
  ctx.translate(Math.round(x), Math.round(y));
  ctx.scale(S, S);
  
  if (dead) {
    // Squished flat goomba
    ctx.fillStyle = '#5a3d28';
    ctx.fillRect(0, 10, 14, 4);
    ctx.fillStyle = '#e5c19e';
    ctx.fillRect(2, 11, 10, 2);
    ctx.restore();
    return;
  }
  
  // Wiggle legs based on frame
  const walkFrame = Math.floor(frame / 6) % 2;
  
  for (let row = 0; row < 14; row++) {
    for (let col = 0; col < 14; col++) {
      let colorIdx = GOOMBA_SPRITE[row][col];
      
      // Animate legs
      if (row >= 11 && walkFrame === 1) {
        let newCol = col;
        if (col < 7) newCol = (col + 1) % 7;
        else newCol = 7 + ((col - 7 + 6) % 7);
        colorIdx = GOOMBA_SPRITE[row][newCol];
      }
      
      if (colorIdx > 0) {
        ctx.fillStyle = colors[colorIdx];
        ctx.fillRect(col, row, 1, 1);
      }
    }
  }
  
  ctx.restore();
}

function gameLoop() {
  if (!GAME.active) return;
  GAME.frame++;
  
  const P = GAME.player;
  const K = GAME.keys;
  const BW = GAME.PX_W * GAME.SCALE;
  const BH = GAME.PX_H * GAME.SCALE;
  
  // Input
  const left = K['ArrowLeft'] || K['a'] || K['A'];
  const right = K['ArrowRight'] || K['d'] || K['D'];
  const jump = K['ArrowUp'] || K['w'] || K['W'] || K[' '];
  
  if (left) {
    P.vx -= 0.4;
    P.facingRight = false;
    P.isIdle = false;
  } else if (right) {
    P.vx += 0.4;
    P.facingRight = true;
    P.isIdle = false;
  } else {
    P.isIdle = true;
  }
  
  P.vx = Math.max(-GAME.MAX_SPEED, Math.min(GAME.MAX_SPEED, P.vx));
  P.vx *= GAME.FRICTION;
  P.vy += GAME.GRAVITY;
  if (P.vy > 12) P.vy = 12;
  
  // Horizontal movement
  P.x += P.vx;
  // Bounds
  if (P.x < 0) P.x = 0;
  if (P.x > document.body.scrollWidth - BW) P.x = document.body.scrollWidth - BW;
  
  // Vertical movement + collision
  const nextY = P.y + P.vy;
  P.onGround = false;
  
  for (const bl of GAME.blocks) {
    const bTop = bl.docY;
    if (
      P.x + BW - 4 > bl.x &&
      P.x + 4 < bl.x + bl.w &&
      P.y + BH <= bTop &&
      nextY + BH >= bTop
    ) {
      P.y = bTop - BH;
      P.vy = 0;
      P.onGround = true;
      break;
    }
  }
  
  if (!P.onGround) P.y = nextY;
  
  // Jump
  if (jump && P.onGround) {
    P.vy = GAME.JUMP;
    P.onGround = false;
    playRetroSound('jump');
  }
  
  // Fall off page → respawn
  if (P.y > GAME.scrollY + window.innerHeight + 100) {
    P.x = window.innerWidth / 2 - 16;
    P.y = GAME.scrollY + 100;
    P.vx = 0;
    P.vy = 0;
  }
  
  // Run dust particles spawn
  if (Math.abs(P.vx) > 0.8 && P.onGround && GAME.frame % 5 === 0) {
    GAME.particles.push({
      x: P.x + (P.facingRight ? 0 : BW),
      y: P.y + BH - 2,
      vx: -P.vx * 0.2 + (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.4,
      size: Math.random() * 3 + 2,
      alpha: 0.6
    });
  }
  
  // Update dust particles
  GAME.particles.forEach(pt => {
    pt.x += pt.vx;
    pt.y += pt.vy;
    pt.alpha -= 0.02;
  });
  GAME.particles = GAME.particles.filter(pt => pt.alpha > 0);
  
  // Update Goombas
  GAME.enemies.forEach(en => {
    if (en.dead) {
      en.deadFrame++;
      return;
    }
    
    en.x += en.vx;
    if (en.x <= en.parentBlock.x) {
      en.x = en.parentBlock.x;
      en.vx = -en.vx;
    } else if (en.x + en.width >= en.parentBlock.x + en.parentBlock.w) {
      en.x = en.parentBlock.x + en.parentBlock.w - en.width;
      en.vx = -en.vx;
    }
    
    // Collision with Mario
    const mLeft = P.x;
    const mRight = P.x + BW;
    const mTop = P.y;
    const mBot = P.y + BH;
    
    const eLeft = en.x;
    const eRight = en.x + en.width;
    const eTop = en.parentBlock.docY - en.height;
    const eBot = en.parentBlock.docY;
    
    if (mRight - 3 > eLeft && mLeft + 3 < eRight && mBot >= eTop && mTop <= eBot) {
      if (P.vy > 0 && mBot <= eTop + 8) {
        en.dead = true;
        en.deadFrame = 0;
        P.vy = -4.5; // Bounce Mario up!
        playRetroSound('stomp');
      } else {
        playRetroSound('bump');
        P.x = window.innerWidth / 2 - 16;
        P.y = GAME.scrollY + 100;
        P.vx = 0;
        P.vy = 0;
      }
    }
  });
  
  GAME.enemies = GAME.enemies.filter(en => !en.dead || en.deadFrame < 25);
  
  // Update collected coin animations (fade and float up)
  GAME.cells.forEach(cell => {
    if (cell.collected) {
      if (cell.animAlpha === undefined) {
        cell.animAlpha = 1.0;
        cell.animY = 0;
      }
      if (cell.animAlpha > 0) {
        cell.animY -= 1.2;
        cell.animAlpha -= 0.035;
      }
    }
  });
  
  // Collectible collision
  for (let i = 0; i < GAME.cells.length; i++) {
    const cell = GAME.cells[i];
    if (cell.collected) continue;
    const dx = (P.x + BW / 2) - (cell.x + 6);
    const dy = (P.y + BH / 2) - (cell.docY + 8);
    if (Math.sqrt(dx * dx + dy * dy) < 28) {
      cell.collected = true;
      GAME.score++;
      playRetroSound('coin');
      const scoreEl = document.getElementById('game-score');
      if (scoreEl) scoreEl.textContent = `🪙 ${GAME.score} / ${GAME.totalCells}`;
      if (GAME.score >= GAME.totalCells) {
        playRetroSound('victory');
        setTimeout(() => {
          alert('🏆 SUPER ARIF MARIO VICTORY! 🏆\nYou collected all the coins and saved the AI Agent! 👑');
          stopGame();
        }, 500);
      }
    }
  }
  
  // Camera scroll to follow player
  const targetScroll = P.y - window.innerHeight / 2;
  GAME.scrollY += (Math.max(0, targetScroll) - GAME.scrollY) * 0.1;
  window.scrollTo(0, GAME.scrollY);
  
  // === RENDER ===
  const ctx = GAME.ctx;
  const viewY = GAME.scrollY;
  ctx.clearRect(0, 0, GAME.canvas.width, GAME.canvas.height);
  
  // Draw blocks (with their recoil offsets)
  for (const bl of GAME.blocks) {
    const screenY = bl.docY - viewY;
    if (screenY > -20 && screenY < GAME.canvas.height + 20) {
      drawGameBlock(ctx, bl.x, screenY, bl.w, bl.bumpY);
    }
  }
  
  // Draw coins (including floating animations)
  for (let i = 0; i < GAME.cells.length; i++) {
    const cell = GAME.cells[i];
    const screenY = cell.docY - viewY;
    
    if (cell.collected) {
      if (cell.animAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = cell.animAlpha;
        drawGoldCoin(ctx, cell.x, screenY + cell.animY, i);
        ctx.fillStyle = '#fcc111';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('+1', cell.x + 14, screenY + cell.animY + 6);
        ctx.restore();
      }
    } else {
      if (screenY > -30 && screenY < GAME.canvas.height + 30) {
        drawGoldCoin(ctx, cell.x, screenY, i);
      }
    }
  }
  
  // Draw Goomba enemies
  GAME.enemies.forEach((en, idx) => {
    const screenY = en.parentBlock.docY - viewY - en.height;
    if (screenY > -20 && screenY < GAME.canvas.height + 20) {
      drawPixelGoomba(ctx, en.x, screenY, GAME.frame, en.dead);
    }
  });
  
  // Draw dust particles
  GAME.particles.forEach(pt => {
    const screenY = pt.y - viewY;
    ctx.save();
    ctx.globalAlpha = pt.alpha;
    ctx.fillStyle = 'rgba(230,230,230,0.5)';
    ctx.beginPath();
    ctx.arc(pt.x, screenY, pt.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  
  // Draw player
  const playerScreenY = P.y - viewY;
  drawPixelMario(ctx, P.x, playerScreenY, GAME.frame, P.onGround, P.isIdle, P.facingRight);
  
  GAME.loopId = requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => {
  if (GAME.active) {
    resizeGameCanvas();
    generateGameWorld();
  }
});
