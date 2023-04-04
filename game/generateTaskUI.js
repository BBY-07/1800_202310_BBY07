const generateTaskUI = ({
  name,
  description = "description",
  action = "action",
}) => `
  <div class="task">
    <div class="task-header">${name}</div>
    <div class="task-body">
      <div class="task-description">
        <div class="description">${description}</div>
        <div class="what-to-do">What do you want to do?</div>
      </div>
      <div class="task-action">
        <button onclick="handleAction(event)">${action}</button>
      </div>
    </div>
  </div>
`;

const generateTaskCompleteUI = ({ explanation = "explanation", gif, title }) => `
  <div class="task">
  <div class="task-header">${title}</div>
    <img src="../images/${gif}"/>
    <div class="task-body">
      <div class="task-explanation">${explanation}</div>
      <div class="task-continue">
        <button onclick="handleContinue(event)">Continue</button>
      </div>
    </div>
  </div>
`;