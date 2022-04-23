import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
const { TextArea } = Input;

function EditorItem(props) {
    const { onChange, value, submitting, onSubmit } = props;
    return (
        <>
            <p className="comment_author-name">Bùi Hoàng Long</p>
            <Form.Item>
                <TextArea
                    rows={2}
                    onChange={onChange}
                    defaultValue={value}
                    placeholder="Nhập bình luận của bạn..."
                />
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="primary"
                    style={{ color: '#fff' }}
                >
                    Add Comment
                </Button>
            </Form.Item>
        </>
    );
}

EditorItem.propTypes = {};

export default EditorItem;
