import { keyframes, styled } from '@mui/system';
import { CommonColors } from '@themes';

interface SectionProps {
  background?: string;
  color?: string;
}

// SUCCESS ANIMATION
const RotateCircle = keyframes`
  0% {
    transform: rotate(-45deg);
  }
  5% {
    transform: rotate(-45deg);
  }
  12% {
    transform: rotate(-405deg);
  }
  100% {
    transform: rotate(-405deg);
  }
`;

const SuccessIconLineTip = keyframes`
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }
  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }
  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }
  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
`;

const SuccessIconLineLong = keyframes`
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }
  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }
  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
`;

// ERROR ANIMATION
const ErrorXLeft = keyframes`
  0%,
  65% {
    left: 82px;
    top: 95px;
    width: 0;
  }
  84% {
    left: 14px;
    top: 33px;
    width: 47px;
  }
  100% {
    left: 17px;
    top: 37px;
    width: 47px;
  }
`;

const ErrorXRight = keyframes`
  0%,
	65% {
		right: 82px;
		top: 95px;
		width: 0;
	}
	84% {
		right: 14px;
		top: 33px;
		width: 47px;
	}
	100% {
		right: 16px;
		top: 37px;
		width: 47px;
	}
`;

// WARNING ANIMATION
const WarningScaleWarning = keyframes`
  0% {
    transform: scale(1);
  }

  30% {
    transform: scale(1.02);
  }

  100% {
    transform: scale(1);
  }
`;

const WarningPulseWarning = keyframes`
  0% {
    background-color: white;
    transform: scale(1);
    opacity: 0.5;
  }

  30% {
    background-color: white;
    transform: scale(1);
    opacity: 0.5;
  }

  100% {
    background-color: ${CommonColors.diSerria};
    transform: scale(2);
    opacity: 0;
  }
`;

const WarningPulseWarningIns = keyframes`
  0% {
    background-color: #F8D486;
  }

  100% {
    background-color: #F8BB86;
  }
`;

const VisiblePopup = keyframes`
  0% {
    transform: scale(1,1);
  }
  50% {
    transform: scale(1.2,1.2);
  }
  100% {
    transform: scale(1,1);
  }
`;

// RENDER ICONS

const IconWrapper = styled('div')`
  width: 80px;
  margin: 0 auto;
`;

const SuccessIcon = styled('div')`
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 50%;
  box-sizing: content-box;
  border: 4px solid ${CommonColors.oceanGreen};

  &::before {
    top: 3px;
    left: -2px;
    width: 30px;
    transform-origin: 100% 50%;
    border-radius: 100px 0 0 100px;
  }

  &::after {
    top: 0;
    left: 30px;
    width: 60px;
    transform-origin: 0 50%;
    border-radius: 0 100px 100px 0;
    animation: ${RotateCircle} 4.25s ease-in;
  }

  &::before,
  &::after {
    content: '';
    height: 100px;
    position: absolute;
    background: white;
    transform: rotate(-45deg);
  }
  & .success_icon_line {
    height: 5px;
    background-color: ${CommonColors.oceanGreen};
    display: block;
    border-radius: 2px;
    position: absolute;
    z-index: 10;
  }

  & .success_line_tip {
    top: 46px;
    left: 14px;
    width: 25px;
    transform: rotate(45deg);
    animation: ${SuccessIconLineTip} 0.75s;
  }

  & .success_line_long {
    top: 38px;
    right: 8px;
    width: 47px;
    transform: rotate(-45deg);
    animation: ${SuccessIconLineLong} 0.75s;
  }

  & .success_icon_circle {
    top: -4px;
    left: -4px;
    z-index: 10;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: absolute;
    box-sizing: content-box;
    border: 4px solid rgba(75, 177, 128, 0.5);
  }

  & .success_icon_fix {
    top: 8px;
    width: 5px;
    left: 26px;
    z-index: 1;
    height: 85px;
    position: absolute;
    transform: rotate(-45deg);
    background-color: white;
  }
`;

const ErrorIcon = styled('div')`
  border-radius: 50%;
  border: 4px solid ${CommonColors.fuzzyWuzzyBrown};
  box-sizing: content-box;
  height: 80px;
  margin: 20px auto;
  padding: 0;
  position: relative;
  width: 80px;

  &:after,
  &:before {
    background: white;
    content: '';
    height: 120px;
    position: absolute;
    transform: rotate(45deg);
    width: 60px;
  }

  &:before {
    border-radius: 120px 0 0 120px;
    left: -33px;
    top: -14px;
    transform-origin: 60px 60px;
    transform: rotate(-45deg);
  }

  &:after {
    border-radius: 0 120px 120px 0;
    left: 30px;
    top: -11px;
    transform-origin: 0 60px;
    transform: rotate(-45deg);
    animation: ${RotateCircle} 4.25s ease-in;
  }

  & .error_place_holder {
    border-radius: 50%;
    border: 4px solid rgba(201, 84, 84, 0.2);
    box-sizing: content-box;
    height: 80px;
    left: -4px;
    position: absolute;
    top: -4px;
    width: 80px;
    z-index: 2;
  }

  & .error_icon_fix {
    background-color: white;
    height: 90px;
    left: 28px;
    position: absolute;
    top: 8px;
    transform: rotate(-45deg);
    width: 5px;
    z-index: 1;
  }

  & .error_x_mark {
    display: block;
    position: relative;
    z-index: 2;
  }

  & .error_line {
    border-radius: 2px;
    display: block;
    height: 5px;
    position: absolute;
    z-index: 2;
    background-color: ${CommonColors.fuzzyWuzzyBrown};
    top: 37px;
    width: 47px;
  }

  & .error_left {
    left: 17px;
    transform: rotate(45deg);
  }

  & .error_right {
    right: 16px;
    transform: rotate(-45deg);
  }

  & .error_animateX_Left {
    animation: ${ErrorXLeft} 0.75s;
  }

  & .error_animateX_Right {
    animation: ${ErrorXRight} 0.75s;
  }
`;

const WarningIcon = styled('div')`
  border-radius: 50%;
  border: 4px solid ${CommonColors.diSerria};
  box-sizing: content-box;
  height: 80px;
  margin: 20px auto;
  padding: 0;
  position: relative;
  width: 80px;
  animation: ${WarningScaleWarning} 0.75s infinite alternate;

  &:before {
    animation: ${WarningPulseWarning} 2s linear infinite;
    background-color: white;
    border-radius: 50%;
    content: '';
    display: inline-block;
    height: 100%;
    opacity: 0;
    position: absolute;
    width: 100%;
  }

  &:after {
    background-color: white;
    border-radius: 50%;
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  & .warning_body {
    background-color: ${CommonColors.diSerria};
    border-radius: 2px;
    height: 47px;
    left: 50%;
    margin-left: -2px;
    position: absolute;
    top: 10px;
    width: 5px;
    z-index: 2;
  }

  & .warning_dot {
    background-color: ${CommonColors.diSerria};
    border-radius: 50%;
    bottom: 10px;
    height: 7px;
    left: 50%;
    margin-left: -3px;
    position: absolute;
    width: 7px;
    z-index: 2;
  }

  & .warning_pulseWarningIns {
    animation: ${WarningPulseWarningIns} 0.75s infinite alternate;
  }
`;

// RENDER CONTAINER

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 9999;
  background-color: rgba(16, 16, 16, 0.7);
  width: 100vw;
  height: 100%;
`;

const Container = styled('div')`
  background: white;
  border-radius: 5px;
  border: 1px solid white;
  min-height: 250px;
  max-height: 450px;
  width: 600px;
  padding: 2em;
  display: flex;
  flex-direction: column;
  color: ${CommonColors.bismark};
  animation: ${VisiblePopup} 0.5s;
  & .alert__message {
    font-size: 0.9em;
    margin: unset;
    text-align: center;
    white-space: pre-line;
  }
`;

const Title = styled('p')`
  margin: 0.5em auto;
  &.title_success {
    color: ${CommonColors.oceanGreen};
  }
  &.title_error {
    color: ${CommonColors.fuzzyWuzzyBrown};
  }
  &.title_warning {
    color: ${CommonColors.diSerria};
  }
`;

const Button = styled('button')`
  color: ${(props: SectionProps) => props.color || 'white'};
  background: ${(props: SectionProps) =>
    props.background || CommonColors.burntSienna};
  border: none;
  cursor: pointer;
  text-align: center;
  outline: none;
  border-radius: 5px;
  padding: 5px 10px;
  min-width: 5em;
  font-size: 1em;
`;

const ButtonWrapper = styled('div')`
  display: flex;
  margin-left: auto;
  margin-top: 3em;
  button {
    margin-right: 1em;
  }
  button:last-child {
    margin-right: 0;
  }
`;

export {
  Wrapper,
  Container,
  IconWrapper,
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  Title,
  Button,
  ButtonWrapper,
};
