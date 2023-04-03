const generateTaskUI = ({
  name,
  description = "description",
  action = "action",
}) => `
  <div class="task">
    <div class="task-header">${name}</div>
    <div class="task-body">
      <div class="task-description">
        ${description}
        <div class="what-to-do">What do you want to do?</div>
      </div>
      <div class="task-action">
        <button onclick="handleAction(event)">${action}</button>
      </div>
    </div>
  </div>
`;

const generateTaskCompleteUI = ({ explanation = "explanation" }) => `
  <div class="task">
    <div class="task-header">Task Complete</div>
    <div class="task-body">
      <div class="task-explanation">${explanation}</div>
      <div class="task-continue">
        <button onclick="handleContinue(event)">Continue</button>
      </div>
    </div>
  </div>
`;