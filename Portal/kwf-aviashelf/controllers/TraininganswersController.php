<?php
class TraininganswersController extends Kwf_Controller_Action_Auto_Grid
{
    protected $_modelName = 'TrainingAnswers';
    protected $_defaultOrder = array('field' => 'id', 'direction' => 'ASC');
    protected $_paging = 0;
    protected $_buttons = array('add', 'delete');
    protected $_editDialog = array(
        'controllerUrl' => '/traininganswer',
        'width' => 800,
        'height' => 460
    );

    public function indexAction()
    {
        $this->view->ext('Traininganswers');
    }
    
    protected function _initColumns()
    {
        $this->_filters = array('text' => array('type' => 'TextField'));
        
        $this->_columns->add(new Kwf_Grid_Column_Button('edit'));
        $this->_columns->add(new Kwf_Grid_Column_Checkbox('isCorrect', trlKwf('Correct')))->setWidth(100);
        $this->_columns->add(new Kwf_Grid_Column('answer', trlKwf('Answer')))->setWidth(400);
    }
    
    protected function _getWhere()
    {
        $ret = parent::_getWhere();
        $ret['questionId = ?'] = $this->_getParam('questionId');
        return $ret;
    }
}
