# This repo is all above how JSX and react work

## "It's for my learning and understanding

# Vdom Implementation

```mermaid
graph TB
    %% Main steps with subgraphs
    subgraph Core["Core Structure"]
        VNode["Virtual Node Structure"]
        Props["Properties"]
        Children["Children"]
        VNode --> Props
        VNode --> Children
    end

    subgraph Creation["Element Creation"]
        Create["createElement Function"]
        TypeHandle["Handle Types"]
        PropNorm["Normalize Props"]
        ChildProcess["Process Children"]
        Create --> TypeHandle
        Create --> PropNorm
        Create --> ChildProcess
    end

    subgraph Render["Rendering Pipeline"]
        DOMCreate["Create DOM Nodes"]
        SetAttrs["Set Attributes"]
        EventBind["Bind Events"]
        AppendKids["Append Children"]
        DOMCreate --> SetAttrs
        SetAttrs --> EventBind
        EventBind --> AppendKids
    end

    subgraph Diff["Diffing"]
        Compare["Compare Nodes"]
        TypeCheck["Check Types"]
        PropDiff["Diff Properties"]
        ChildDiff["Diff Children"]
        Compare --> TypeCheck
        TypeCheck --> PropDiff
        PropDiff --> ChildDiff
    end

    subgraph Patch["Patching"]
        Changes["Generate Changes"]
        UpdateQueue["Update Queue"]
        ApplyChanges["Apply Changes"]
        Changes --> UpdateQueue
        UpdateQueue --> ApplyChanges
    end

    subgraph State["State Management"]
        StateStore["State Container"]
        UpdateMech["Update Mechanism"]
        StateQueue["State Queue"]
        BatchUpdate["Batch Updates"]
        StateStore --> UpdateMech
        UpdateMech --> StateQueue
        StateQueue --> BatchUpdate
    end

    subgraph Comp["Component System"]
        CompLife["Lifecycle Methods"]
        PropMan["Props Management"]
        StateMan["State Management"]
        Context["Context System"]
        CompLife --> PropMan
        CompLife --> StateMan
        CompLife --> Context
    end

    subgraph Events["Event System"]
        EventDel["Event Delegation"]
        EventBub["Event Bubbling"]
        EventClean["Cleanup"]
        EventDel --> EventBub
        EventBub --> EventClean
    end

    subgraph Recon["Reconciliation"]
        TreeDiff["Tree Diffing"]
        PatchGen["Patch Generation"]
        UpdateSched["Update Scheduling"]
        TreeDiff --> PatchGen
        PatchGen --> UpdateSched
    end

    subgraph Batch["Batching System"]
        CollectUp["Collect Updates"]
        Priority["Prioritize"]
        Execute["Execute Batch"]
        CollectUp --> Priority
        Priority --> Execute
    end

    subgraph Mount["Mount Process"]
        InitTree["Initialize Tree"]
        SetupState["Setup State"]
        AttachEvents["Attach Events"]
        InitTree --> SetupState
        SetupState --> AttachEvents
    end

    subgraph Update["Update Process"]
        TriggerUp["Trigger Update"]
        SchedRecon["Schedule Reconciliation"]
        ApplyUp["Apply Updates"]
        TriggerUp --> SchedRecon
        SchedRecon --> ApplyUp
    end

    %% Connections between main processes
    Core --> Creation
    Creation --> Render
    Render --> Diff
    Diff --> Patch
    Patch --> Update
    State --> Update
    Comp --> Update
