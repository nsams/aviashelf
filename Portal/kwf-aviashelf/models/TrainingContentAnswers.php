<?php
class TrainingContentAnswers extends Kwf_Model_Db
{
    protected $_table = 'trainingContentAnswers';
    protected $_toStringField = 'answer';
    
    protected $_referenceMap = array(
        'TrainingContentQuestions' => array(
            'column'           => 'contentQuestionId',
            'refModelClass'     => 'TrainingContentQuestions'
        )
    );
}
