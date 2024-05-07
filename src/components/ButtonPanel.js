import React from 'react';
import { Button } from 'antd';
import { SmileOutlined, SearchOutlined, StarOutlined, SettingOutlined } from '@ant-design/icons';


const ButtonPanel = () => {
    return (
        <div className="button-panel">
            <Button icon={<SmileOutlined style={{ fontSize: '30px' }} />} className="button disappointment">
                <div>친구</div>
            </Button>
            <Button icon={<SearchOutlined style={{ fontSize: '30px' }} />} className="button green-color">
                <div>그룹검색</div>
            </Button>
            <Button icon={<StarOutlined style={{ fontSize: '30px' }} />} className="button violet">
                <div>빈일정</div>
            </Button>
            <Button icon={<SettingOutlined style={{ fontSize: '30px' }} />} className="button navy-blue">
                <div>내설정</div>
            </Button>
        </div>
    );
};
export default ButtonPanel;