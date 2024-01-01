# US 480 - As a task manager, I want to search for all pending tasks.

## 1. Context

* First time that this user story is being implemented.
* This task is relative to the task manager.

## 2. Requirements

**US 480 -** As a task manager, I want to search for all pending tasks.

**Dependencies:**
- US 460 - As the system user I intend to request a task, specify the parameters necessary for its execution, namely the starting point and term point and what is the intended task

### Client Questions
> **Q**:  pretendido é consultar as requisições de tarefas que ainda não foram aprovadas, nem recusadas (ou seja, apresentar só as "pendentes"). Ou se seria pretendido consultar as tarefas "pendentes" + as tarefas recusadas. <br>
> **A**: pretende-se a listagem das requisições pendentes de decisão" <br>

> **Q**: As requisições recusadas também contam como ainda não aprovadas ou apenas as requisições pendentes de aprovação/recusacão.  <br>
> **A**:esta opção deve mostrar ao utilizador as requisções que ainda não tiveram qualquer tipo de decisão: aprovação/recusa. <br>

## 3. Analysis

**Analyzing this User Story we understand that:**
* The task manager is the user who is responsible for managing the tasks.
* The task manager can search for all pending tasks that have not yet been approved or rejected.

### 3.1. Domain Model Excerpt
![DomainModelExcerpt](Diagrams/DomainModelExcerpt.svg)

## 4. Design

### 4.1. Realization

### Level1
###### LogicalView:
![LogicalView](Diagrams/Level1/LogicalView.svg)

###### SceneryView:
![SceneryView](Diagrams/Level1/SceneryView.svg)

###### ProcessView:
![ProcessView](Diagrams/Level1/ProcessView.svg)

#### Level2

###### LogicalView:

![LogicalView](Diagrams/Level2/LogicalView.svg)

###### ImplementationView:
![ImplementationView](Diagrams/Level2/ImplementationView.svg)

###### PhysicalView:
![PhysicalView](Diagrams/Level2/PhysicalView.svg)

###### ProcessView:
![ProcessView](Diagrams/Level2/ProcessView.svg)

#### Level3
###### LogicalView:
![LogicalView](Diagrams/Level3/LogicalView.svg)

###### ImplementationView:
![ImplementationView](Diagrams/Level3/ImplementationView.svg)

###### ProcessView:
![ProcessView](Diagrams/Level3/ProcessView.svg)


### 4.2. Applied Patterns



### 4.3. Tests



## 5. Implementation



## 6. Integration/Demonstration



## 7. Observations

No observations.
