<?php
class MygroupsController extends Kwf_Controller_Action_Auto_Grid
{
    protected $_modelName = 'TrainingGroups';
    protected $_defaultOrder = array('field' => 'id', 'direction' => 'DESC');
    protected $_paging = 30;
    protected $_buttons = array();

    public function indexAction()
    {
        $this->view->ext('Mygroups');
    }
    
    protected function _initColumns()
    {
        $this->_columns->add(new Kwf_Grid_Column('startDate', trlKwf('Start Date')))->setWidth(80)->setRenderer('taskCheckDate');
        $this->_columns->add(new Kwf_Grid_Column('endDate', trlKwf('End Date')))->setWidth(90)->setRenderer('taskCheckDate');
        $this->_columns->add(new Kwf_Grid_Column('number', trlKwf('Number')))->setWidth(60);
        $this->_columns->add(new Kwf_Grid_Column('title', trlKwf('Title')))->setWidth(200);
        $this->_columns->add(new Kwf_Grid_Column('trainingName', trlKwf('Training')))->setWidth(300);
        $this->_columns->add(new Kwf_Grid_Column('questions', trlKwf('Questions in session')))->setWidth(100);
    }
    
    protected function _getSelect()
    {
        $ret = parent::_getSelect();

        $users = Kwf_Registry::get('userModel');
        
        $employeesModel = Kwf_Model_Abstract::getInstance('Employees');
        $employeesSelect = $employeesModel->select()->whereEquals('userId', $users->getAuthedUserId());

        $employee = $employeesModel->getRow($employeesSelect);

        if ($employee != NULL)
        {
            $s = new Kwf_Model_Select();
            $s->whereEquals('employeeId', $employee->id);
            $ret->where(new Kwf_Model_Select_Expr_Child_Contains('TrainingResults', $s));
        }
        
        return $ret;
    }
}