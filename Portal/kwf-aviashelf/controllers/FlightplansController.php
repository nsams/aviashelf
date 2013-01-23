<?php
class FlightplansController extends Kwf_Controller_Action_Auto_Grid
{
    protected $_modelName = 'Flightplans';
    protected $_defaultOrder = array('field' => 'planDate', 'direction' => 'DESC');
    protected $_paging = 30;
    protected $_buttons = array('add');
    protected $_editDialog = array(
                                   'controllerUrl' => '/flightplan',
                                   'width' => 550,
                                   'height' => 260
                                   );

    public function indexAction()
    {
        $this->view->ext('Flightplans');
    }
    
    protected function _initColumns()
    {
        $this->_filters = array('text' => array('type' => 'TextField'));
        
        $this->_columns->add(new Kwf_Grid_Column_Button('edit'));
        $this->_columns->add(new Kwf_Grid_Column('planDate', trlKwf('Date'), 100))->setRenderer('dateCorrect');
        $this->_columns->add(new Kwf_Grid_Column('employeeName', trlKwf('Responsible'), 200));
    }
}
