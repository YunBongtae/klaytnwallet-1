import React, { Component } from 'react'
import cx from 'classnames'
import ReactTooltip from 'react-tooltip'

import PasswordTooltip from 'components/PasswordTooltip'

import './InputPassword.scss'


type Props = {
  className: string,
  name: string,
  value: string,
  label: string,
  onChange: Function,
  onKeyPress: Function,
  placeholder: string,
  width: string,
  disabled: boolean,
  err: boolean,
  activeAlways: boolean,
}

class InputPassword extends Component<Props> {
  state = {
    active: false,
    showPassword: false,
  }

  toggleActive = () => this.setState({ active: !this.state.active })
  toggleShowPassword = () => this.setState({ showPassword: !this.state.showPassword })

  render() {
    const {
      className,
      name,
      value,
      label,
      onChange,
      onKeyPress,
      placeholder,
      width,
      disabled,
      err,
      activeAlways,
      onKeyUp,
    } = this.props

    const { active, showPassword } = this.state

    return (
      <div
        className={cx('InputPassword', className)}
        style={{ width: `${width}` }}
        onFocus={this.toggleActive}
        onBlur={this.toggleActive}
      >
        {label && <label className="InputPassword__label" htmlFor={name}>{label}</label>}
        <div className={cx('InputPassword__inputWrapper', {
          'InputPassword__input--active': activeAlways || active,
        })}>
          <ReactTooltip
            id="password-tooltip"
            className="InputPassword__tooltip"
            effect="solid"
          >
            <PasswordTooltip value={value} />
          </ReactTooltip>
          <input
            data-tip
            data-for='password-tooltip'
            data-event='focus'
            data-event-off='blur'
            data-offset={'{ "top": 10 }'}
            id={name}
            type={showPassword ? 'text' : 'password'}
            name={name}
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            onKeyUp={onKeyUp}
            className={cx('InputPassword__input', { 'InputPassword--err': err })}
          />
          <button
            className={cx('InputPassword__eye', {
              'InputPassword__eye--show': !showPassword,
              'InputPassword__eye--hide': showPassword,
            })}
            onClick={this.toggleShowPassword}
            tabIndex="-1"
          />
        </div>
      </div>
    )
  }
}

export default InputPassword
