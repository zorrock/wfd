import React, {Component,Fragment} from 'react';
import {Input,Select,Checkbox,Collapse,DatePicker,TimePicker} from 'antd'
import 'antd/lib/input/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/switch/style/css';
import styles from './index.less';
import G6 from '@antv/g6/src';
import moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare,faCopy, faPaste,faTrashAlt,faSearchPlus,faSearchMinus,faCompress,faExpand,faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faLayerUp, faLayerDown,faUndo,faRedo } from './util/faIcons';
library.add(faShare,faCopy,faPaste,faTrashAlt,faSearchPlus,faSearchMinus,faCompress,faExpand,faLayerGroup,faLayerUp,faLayerDown,faUndo,faRedo);
import Command from './plugins/command'
import Toolbar from './plugins/toolbar'
import AddItemPanel from './plugins/addItemPanel'
import CanvasPanel from './plugins/canvasPanel'
import registerItem from './item'
import registerBehavior from './behavior'
registerItem(G6);
registerBehavior(G6);
const { Panel } = Collapse;
const DetailPanel = ({model,onChange,readOnly = false,})=>{
  let title;
  if(model.clazz === 'userTask')
    title = "审批节点属性";
  else if(model.clazz === 'javaTask')
    title = "定制类节点属性";
  else if(model.clazz === 'scriptTask')
    title = "脚本节点属性";
  else if(model.clazz === 'mailTask')
    title = "邮件节点属性";
  else if(model.clazz === 'receiveTask')
    title = "接收节点属性";
  else if(model.clazz === 'exclusiveGateway')
    title = "网关属性";
  else if(model.clazz === 'sequenceFlow')
    title = "连接线属性";
  else if(model.clazz === 'startEvent')
    title = "开始节点属性";
  else if(model.clazz === 'timerStart' || model.clazz === 'timerCatch')
    title = "定时节点属性";
  else if(model.clazz === 'messageStart' || model.clazz === 'messageCatch')
    title = "消息节点属性";
  else if(model.clazz === 'signalStart' || model.clazz === 'signalCatch')
    title = "信号节点属性";
  return (
    model.clazz ? <div data-clazz={model.clazz}>
        <div className={styles.panelTitle}>{title}</div>
        <div className={styles.panelBody}>
          <div className={styles.panelRow}>
            <div>标题：</div>
            <Input style={{width: '100%', fontSize: 12}}
                   value={model.label}
                   onChange={(e) => onChange('label', e.target.value)}
                   disabled={readOnly}
            />
          </div>
          <div className={styles.panelRow}>
            <Checkbox onChange={(e) => onChange('hideIcon', e.target.checked)}
                      disabled={readOnly}
                      checked={!!model.hideIcon}>隐藏图标</Checkbox>
          </div>
          {
            model.clazz === 'userTask' &&
            <Fragment>
              <div className={styles.panelRow}>
                <div>指派类型：</div>
                <Select
                  style={{width: '100%', fontSize: 12}}
                  placeholder="选择一个类型"
                  defaultValue={"person"}
                  value={model.assignType}
                  onChange={(e) => onChange('assignType', e)}
                  disabled={readOnly}
                >
                  <Select.Option key="person">人员</Select.Option>
                  <Select.Option key="persongroup">人员组</Select.Option>
                  <Select.Option key="custom">自定义类</Select.Option>
                </Select>
              </div>
              {
                model.assignType === 'person' &&
                <div className={styles.panelRow}>
                  <div>审批人：</div>
                  <Select
                    mode="multiple"
                    showSearch
                    style={{width: '100%', fontSize: 12}}
                    placeholder="选择审批人"
                    optionFilterProp="children"
                    defaultValue={model.candidateUsers}
                    onChange={(e) => onChange('candidateUsers', e)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    disabled={readOnly}
                  >
                    <Select.Option key="admin">管理员</Select.Option>
                    <Select.Option key="zhang3">张三</Select.Option>
                    <Select.Option key="li4">李四</Select.Option>
                  </Select>
                </div>
              }
              {
                model.assignType === 'persongroup' &&
                <div className={styles.panelRow}>
                  <div>审批组：</div>
                  <Select
                    mode="multiple"
                    showSearch
                    style={{width: '100%', fontSize: 12}}
                    placeholder="选择审批组"
                    optionFilterProp="children"
                    defaultValue={model.candidateGroups}
                    onChange={(e) => onChange('candidateGroups', e)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    disabled={readOnly}
                  >
                    <Select.Option key="manager">经理组</Select.Option>
                    <Select.Option key="test">IT人员</Select.Option>
                    <Select.Option key="oa">安全组</Select.Option>
                  </Select>
                </div>
              }
              {
                model.assignType === 'custom' &&
                <div className={styles.panelRow}>
                  <div>类名：</div>
                  <Input style={{width: '100%', fontSize: 12}}
                         value={model.javaClass}
                         onChange={(e) => {
                           onChange('javaClass', e.target.value)
                         }}
                         disabled={readOnly}
                  />
                </div>
              }
              <div className={styles.panelRow}>
                <div style={{display:'inline'}}>到期时间：</div>
                <DatePicker defaultValue={model.dueDate ? moment(model.dueDate) : null}
                            disabled={readOnly}
                            showTime
                            onChange={(value,dateString) => onChange('dueDate', value) }
                />
              </div>
              <div className={styles.panelRow}>
                <Checkbox onChange={(e) => onChange('isSequential', e.target.checked)}
                          disabled={readOnly}
                          checked={!!model.isSequential}>会签</Checkbox>
              </div>
            </Fragment>
          }
          {
            model.clazz === 'scriptTask' &&
            <Fragment>
              <div className={styles.panelRow}>
                <div style={{display:'inline'}}>脚本：</div>
                <Input.TextArea style={{width: '100%', fontSize: 12}}
                                rows={4}
                                value={model.script}
                                onChange={(e) => {
                                  onChange('script', e.target.value)
                                }}
                                disabled={readOnly}
                />
              </div>
            </Fragment>
          }
          {
            model.clazz === 'javaTask' &&
            <Fragment>
              <div className={styles.panelRow}>
                <div style={{display:'inline'}}>类名：</div>
                <Input style={{width: '100%', fontSize: 12}}
                       value={model.javaClass}
                       onChange={(e) => {
                         onChange('javaClass', e.target.value)
                       }}
                       disabled={readOnly}
                />
              </div>
            </Fragment>
          }
          {
            model.clazz === 'receiveTask' &&
            <Fragment>
              <div className={styles.panelRow}>
                <div style={{display:'inline'}}>等待属性：</div>
                <Input style={{width: '100%', fontSize: 12}}
                       value={model.waitField}
                       onChange={(e) => {
                         onChange('waitField', e.target.value)
                       }}
                       disabled={readOnly}
                />
              </div>
              <div className={styles.panelRow}>
                <div style={{display:'inline'}}>等待值：</div>
                <Input style={{width: '100%', fontSize: 12}}
                       value={model.waitValue}
                       onChange={(e) => {
                         onChange('waitValue', e.target.value)
                       }}
                       disabled={readOnly}
                />
              </div>
            </Fragment>
          }
          {
            model.clazz === 'mailTask' &&
            <Fragment>
              <div className={styles.panelRow}>
                <div style={{display:'inline'}}>收件地址：</div>
                <Input style={{width: '100%', fontSize: 12}}
                       value={model.to}
                       onChange={(e) => {
                         onChange('to', e.target.value)
                       }}
                       disabled={readOnly}
                />
              </div>
              <div className={styles.panelRow}>
                <div style={{display:'inline'}}>邮件主题：</div>
                <Input style={{width: '100%', fontSize: 12}}
                       value={model.subject}
                       onChange={(e) => {
                         onChange('subject', e.target.value)
                       }}
                       disabled={readOnly}
                />
              </div>
              <div className={styles.panelRow}>
                <div style={{display:'inline'}}>邮件内容：</div>
                <Input.TextArea style={{width: '100%', fontSize: 12}}
                                rows={4}
                                value={model.content}
                                onChange={(e) => {
                                  onChange('content', e.target.value)
                                }}
                                disabled={readOnly}
                />
              </div>
            </Fragment>
          }
          {
            (model.clazz === 'timerStart' || model.clazz === 'timerCatch') &&
            <Fragment>
              <div className={styles.panelRow}>
                <div style={{display:'inline'}}>循环时间：</div>
                <TimePicker defaultValue={model.cycle}
                            format="HH:mm"
                            disabled={readOnly}
                            onChange={(time) => onChange('cycle', time) }
                />
              </div>
              <div className={styles.panelRow}>
                <div style={{display:'inline'}}>持续时间：</div>
                <TimePicker defaultValue={model.duration}
                            format="HH:mm"
                            disabled={readOnly}
                            onChange={(time) => onChange('duration', time) }
                />
              </div>
            </Fragment>
          }
          {
            (model.clazz === 'signalStart' || model.clazz === 'signalCatch') &&
            <Fragment>
              <div className={styles.panelRow}>
                <div style={{display:'inline'}}>信号名：</div>
                <Input style={{width: '100%', fontSize: 12}}
                       value={model.signal}
                       onChange={(e) => {
                         onChange('signal', e.target.value)
                       }}
                       disabled={readOnly}
                />
              </div>
            </Fragment>
          }
          {
            (model.clazz === 'messageStart' || model.clazz === 'messageCatch') &&
            <Fragment>
              <div className={styles.panelRow}>
                <div style={{display:'inline'}}>消息名：</div>
                <Input style={{width: '100%', fontSize: 12}}
                       value={model.message}
                       onChange={(e) => {
                         onChange('message', e.target.value)
                       }}
                       disabled={readOnly}
                />
              </div>
            </Fragment>
          }
          {
            model.clazz === 'sequenceFlow' &&
            <Fragment>
              <div className={styles.panelRow}>
                <div>条件表达式：</div>
                <Input.TextArea style={{width: '100%', fontSize: 12}}
                                rows={4}
                                value={model.conditionExpression}
                                onChange={(e) => {
                                  onChange('conditionExpression', e.target.value)
                                }}
                                disabled={readOnly}
                />
              </div>
              <div className={styles.panelRow}>
                <div>序号：</div>
                <Input style={{width: '100%', fontSize: 12}}
                       value={model.seq}
                       onChange={(e) => {
                         onChange('seq', e.target.value)
                       }}
                       disabled={readOnly}
                />
              </div>
              <div className={styles.panelRow}>
                <Checkbox onChange={(e) => onChange('reverse', e.target.checked)}
                          disabled={readOnly}
                          checked={!!model.reverse}>反向?</Checkbox>
              </div>
            </Fragment>
          }
        </div>
      </div> : <Fragment />
  )
};

class Designer extends Component {
  static defaultProps = {
    height: 500,
    isView: false,
    mode: 'edit',
  };
  constructor(props) {
    super(props);
    this.pageRef = React.createRef();
    this.toolbarRef = React.createRef();
    this.itemPanelRef = React.createRef();
    this.detailPanelRef = React.createRef();
    this.resizeFunc = ()=>{};
    this.state = {
      selectedModel: {},
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.data !== this.props.data){
      if(this.graph){
        this.graph.changeData(this.props.data);
        this.graph.setMode(this.props.mode);
        this.graph.emit('canvas:click');
        if(this.cmdPlugin){
          this.cmdPlugin.initPlugin(this.graph);
        }
        if(this.props.isView){
          this.graph.fitView(5)
        }
      }
    }
  }

  componentDidMount() {
    const { isView,mode } = this.props;
    const height = this.props.height-1;
    const width = this.pageRef.current.offsetWidth;
    let plugins = [];
    if(!isView){
      this.cmdPlugin = new Command();
      const toolbar = new Toolbar({container:this.toolbarRef.current});
      const addItemPanel = new AddItemPanel({container:this.itemPanelRef.current});
      const canvasPanel = new CanvasPanel({container:this.pageRef.current});
      plugins = [ this.cmdPlugin,toolbar,addItemPanel,canvasPanel ];
    }
    this.graph = new G6.Graph({
      plugins: plugins,
      container: this.pageRef.current,
      height: height,
      width: width,
      modes: {
        default: ['drag-canvas', 'clickSelected'],
        view: [ ],
        edit: ['drag-canvas', 'hoverNodeActived','hoverAnchorActived','dragNode','dragEdge',
          'dragPanelItemAddNode','clickSelected','deleteItem','itemAlign'],
      },
      defaultEdge: {
        shape: 'flow-polyline-round',
      },
    });
    if(isView){
      this.graph.setMode('view');
    }else{
      this.graph.setMode(mode);
    }
    this.graph.data(this.props.data?this.props.data:{nodes:[],edges:[]});
    this.graph.render();
    if(isView && this.props.data && this.props.data.nodes){
      this.graph.fitView(5)
    }
    this.initEvents();
  }

  initEvents(){
    this.graph.on('afteritemselected',(items)=>{
      if(items && items.length > 0) {
        const item = this.graph.findById(items[0]);
        this.setState({selectedModel: {...item.getModel()}});
      } else {
        this.setState({selectedModel: { }});
      }
    });
    const page = this.pageRef.current;
    const graph = this.graph;
    const height = this.props.height-1;
    this.resizeFunc = ()=>{
      graph.changeSize(page.offsetWidth,height);
    };
    window.addEventListener("resize", this.resizeFunc);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunc);
    this.graph.getNodes().forEach(node => {
      node.getKeyShape().stopAnimate();
    });
  }

  onItemCfgChange(key,value){
    const items = this.graph.get('selectedItems');
    if(items && items.length > 0){
      const item = this.graph.findById(items[0]);
      if(this.graph.executeCommand) {
        this.graph.executeCommand('update', {
          itemId: items[0],
          updateModel: {[key]: value}
        });
      }else {
        this.graph.updateItem(item, {[key]: value});
      }
      this.setState({selectedModel:{  ...item.getModel() }});
    }
  }

  render() {
    const height = this.props.height;
    const { isView,mode } = this.props;
    const readOnly = mode !== "edit";
    return (
      <div className={styles.root}>
        { !isView &&
          <div className={styles.toolbar} ref={this.toolbarRef}>
            <span className={styles.command} data-command="undo"><FontAwesomeIcon icon="undo" color="#666" /></span>
            <span className={styles.command} data-command="redo"><FontAwesomeIcon icon="redo" color="#666" /></span>
            <span className={styles.separator} />
            <span className={styles.command} data-command="copy"><FontAwesomeIcon icon="copy" color="#666" /></span>
            <span className={styles.command} data-command="paste"><FontAwesomeIcon icon="paste" color="#666" /></span>
            <span className={styles.command} data-command="delete"><FontAwesomeIcon icon="trash-alt" color="#666" /></span>
            <span className={styles.separator} />
            <span className={styles.command} data-command="zoomIn"><FontAwesomeIcon icon="search-plus" color="#666" /></span>
            <span className={styles.command} data-command="zoomOut"><FontAwesomeIcon icon="search-minus" color="#666" /></span>
            <span className={styles.command} data-command="resetZoom"><FontAwesomeIcon icon="compress" color="#666" /></span>
            <span className={styles.command} onClick={()=>this.graph.fitView(5)}><FontAwesomeIcon icon="expand" color="#666" /></span>
            <span className={styles.separator} />
            <span className={styles.command} data-command="toFront"><FontAwesomeIcon icon="layer-up" color="#666" /></span>
            <span className={styles.command} data-command="toBack"><FontAwesomeIcon icon="layer-down" color="#666" /></span>
          </div>
        }
        <div>
          { !isView &&
            <div ref={this.itemPanelRef} className={styles.itemPanel} style={{height: height}}>
              <Collapse bordered={false} defaultActiveKey={['1']}>
                <Panel header="开始事件" key="1" forceRender>
                  <img data-item="{shape:'start-node',clazz:'startEvent',size:'30*30',label:''}"
                       src={require('../assets/start.svg')} style={{width: 60, height: 60}}/>
                  <img data-item="{shape:'timer-start-node',clazz:'timerStart',size:'30*30',label:''}"
                       src={require('../assets/timer-start.svg')} style={{width: 60, height: 60}}/>
                  <img data-item="{shape:'message-start-node',clazz:'messageStart',size:'30*30',label:''}"
                       src={require('../assets/message-start.svg')} style={{width: 60, height: 60}}/>
                  <img data-item="{shape:'signal-start-node',clazz:'signalStart',size:'30*30',label:''}"
                       src={require('../assets/signal-start.svg')} style={{width: 60, height: 60}}/>
                </Panel>
                <Panel header="活动" key="2" forceRender>
                  <img data-item="{shape:'user-task-node',clazz:'userTask',size:'80*44',label:'审批节点'}"
                       src={require('../assets/user-task.svg')} style={{width: 80, height: 44}}/>
                  <img data-item="{shape:'script-task-node',clazz:'scriptTask',size:'80*44',label:'脚本节点'}"
                       src={require('../assets/script-task.svg')} style={{width: 80, height: 44}}/>
                  <img data-item="{shape:'java-task-node',clazz:'javaTask',size:'80*44',label:'Java节点'}"
                       src={require('../assets/java-task.svg')} style={{width: 80, height: 44}}/>
                  <img data-item="{shape:'mail-task-node',clazz:'mailTask',size:'80*44',label:'邮件节点'}"
                       src={require('../assets/mail-task.svg')} style={{width: 80, height: 44}}/>
                  <img data-item="{shape:'receive-task-node',clazz:'receiveTask',size:'80*44',label:'接收节点'}"
                       src={require('../assets/receive-task.svg')} style={{width: 80, height: 44}}/>
                </Panel>
                <Panel header="网关" key="3" forceRender>
                  <img data-item="{shape:'gateway-node',clazz:'exclusiveGateway',size:'40*40',label:''}"
                       src={require('../assets/gateway.svg')} style={{width: 68, height: 68}}/>
                </Panel>
                <Panel header="捕获事件" key="4" forceRender>
                  <img data-item="{shape:'timer-catch-node',clazz:'timerCatch',size:'50*30',label:''}"
                       src={require('../assets/timer-catch.svg')} style={{width: 68, height: 68}}/>
                  <img data-item="{shape:'message-catch-node',clazz:'messageCatch',size:'50*30',label:''}"
                       src={require('../assets/message-catch.svg')} style={{width: 68, height: 68}}/>
                  <img data-item="{shape:'signal-catch-node',clazz:'signalCatch',size:'50*30',label:''}"
                       src={require('../assets/signal-catch.svg')} style={{width: 68, height: 68}}/>
                </Panel>
                <Panel header="结束事件" key="5" forceRender>
                  <img data-item="{shape:'end-node',clazz:'endEvent',size:'30*30',label:''}"
                       src={require('../assets/end.svg')} style={{width: 58, height: 58}}/>
                </Panel>
              </Collapse>
            </div>
          }
          <div ref={this.pageRef} className={styles.canvasPanel} style={{width:isView?'100%':'70%',borderBottom:isView?0:null}}/>
          { !isView &&
            <div ref={this.detailPanelRef} className={styles.detailPanel} style={{height:height}}>
              <DetailPanel model={this.state.selectedModel} onChange={(key,val)=>{this.onItemCfgChange(key,val)}} readOnly={readOnly} />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Designer;