/**
 * Sdílený datový model projektových záznamů. Každá entita rozšiřuje BaseRecord,
 * proto vždy uchovává provenienci, vlastníka, termín a audit potvrzení.
 */
export const recordStates = ['existuje', 'čeká na validaci', 'právě vzniká', 'plánováno'];

export const entityTypes = [
  'asIsFunction', 'requirement', 'useCase', 'segment', 'dataInput', 'decision',
  'solutionOption', 'risk', 'milestone', 'responsibility', 'definitionOfDoneItem'
];

export const createRecord = ({ id, type, title, state = 'plánováno', source = null, owner = null, dueDate = null, ...details }) => ({
  id, type, title, state, source, owner, dueDate, details,
  confirmationHistory: [],
  verified: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const relationTypes = {
  realizes: 'AS-IS funkce → požadavek',
  describedBy: 'požadavek → use case',
  governedBy: 'use case → rozhodnutí',
  prioritizes: 'rozhodnutí → priorita'
};

export const asIsFates = ['zachovat', 'upravit', 'nahradit', 'ukončit', 'čeká na rozhodnutí'];
export const responseKinds = ['akceptace', 'komentář', 'strukturovaná odpověď', 'volný text'];

export function canPrioritize(requirement, decisions) {
  return !decisions.some(decision =>
    decision.details?.blockedRequirementIds?.includes(requirement.id) &&
    decision.details?.workflowState !== 'uzavřeno'
  );
}

export const decisionWorkflowFields = [
  'problemDescription', 'roles', 'segments', 'availableData', 'options', 'impacts',
  'recommendation', 'decisionMaker', 'dueDate', 'workflowState'
];
