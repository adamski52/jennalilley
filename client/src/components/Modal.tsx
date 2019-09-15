import React from 'react';
import {ModalProps, ModalState} from "../states/Modal";
import OKButton from "./buttons/OKButton";
import BaseReactiveElement from './BaseReactiveElement';

export default class Modal extends BaseReactiveElement<ModalProps, ModalState> {
    public render() {
        if(!this.props.message || !this.props.title) {
            return null;
        }

        return (
            <div className="modal">
                <div className="modal-content">
                    <p className="text-large">{this.props.title}</p>
                    <p>{this.props.message}</p>
                    <div className="modal-buttons text-right">
                        <OKButton onClick={this.props.onClose} />
                    </div>
                </div>
            </div>
        );
    }
}