import Designer from "../../dist";
import React from "react";
export default () => {
  const data = {
    nodes: [{ id: 'startNode', x: 50, y: 200, label: '开始', clazz: 'startEvent', shape: 'start-node', },
      { id: 'taskNode1', x: 200, y: 200, label: '主任审批', assignee: ['admin'], isSequential:false, clazz: 'userTask', shape: 'task-node', },
      { id: 'taskNode2', x: 400, y: 200, label: '经理审批', assignee: ['admin'], isSequential:false, clazz: 'userTask', shape: 'task-node', },
      { id: 'decisionNode', x: 400, y: 320, label: '总金额', clazz: 'exclusiveGateway', shape: 'decision-node', },
      { id: 'taskNode3', x: 400, y: 450, label: '董事长审批', assignee: ['admin','zhang3'], isSequential:false, clazz: 'userTask', shape: 'task-node', },
      { id: 'endNode', x: 600, y: 320, label: '结束', clazz: 'endEvent', shape: 'end-node', }],
    edges: [{ source: 'startNode', target: 'taskNode1', sourceAnchor:1, targetAnchor:3, clazz: 'sequenceFlow' },
      { source: 'taskNode1', target: 'endNode', sourceAnchor:0, targetAnchor:0, clazz: 'sequenceFlow' },
      { source: 'taskNode1', target: 'taskNode2', sourceAnchor:1, targetAnchor:3, clazz: 'sequenceFlow' },
      { source: 'taskNode2', target: 'decisionNode', sourceAnchor:1, targetAnchor:0, clazz: 'sequenceFlow' },
      { source: 'taskNode2', target: 'taskNode1', sourceAnchor:2, targetAnchor:2, clazz: 'sequenceFlow' },
      { source: 'decisionNode', target: 'taskNode3', label:'大于1000', sourceAnchor:2, targetAnchor:0, clazz: 'sequenceFlow' },
      { source: 'decisionNode', target: 'endNode', label:'小于1000', sourceAnchor:1, targetAnchor:2, clazz: 'sequenceFlow'},
      { source: 'taskNode3', target: 'endNode', sourceAnchor:1, targetAnchor:1, clazz: 'sequenceFlow' },
      { source: 'taskNode3', target: 'taskNode1', sourceAnchor:3, targetAnchor:2, clazz: 'sequenceFlow'},
    ]
  };
  return (
    <div >
      <Designer data={data} height={600} mode={"edit"} />
    </div>
  );
}
