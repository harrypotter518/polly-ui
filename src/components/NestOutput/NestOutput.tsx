import React from 'react'
import styled from 'styled-components'

export interface OutputProps {
	endAdornment?: React.ReactNode
	onChange: (e: React.FormEvent<HTMLInputElement>) => void
	placeholder?: string
	startAdornment?: React.ReactNode
	value: string
	_inputToken?: string
	_outputToken?: string
	onKeyUp?: React.ReactNode
}

const NestOutput: React.FC<OutputProps> = ({
	endAdornment,
	onChange,
	placeholder = '0',
	startAdornment,
	value,
	_inputToken,
	_outputToken,
}) => {
	return (
		<StyledOutputWrapper>
			{!!startAdornment && startAdornment}
			<StyledOutput
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{!!endAdornment && endAdornment}
		</StyledOutputWrapper>
	)
}

const StyledOutputWrapper = styled.div`
	align-items: center;
	background: ${(props) => props.theme.color.transparent[100]};
	border-radius: ${(props) => props.theme.borderRadius}px;
	display: flex;
	height: 56px;
	padding: 0 ${(props) => props.theme.spacing[3]}px;
`

const StyledOutput = styled.input`
	background: none;
	border: 0;
	color: ${(props) => props.theme.color.text[100]};
	font-size: 1.25rem;
	flex: 1;
	height: 56px;
	margin: 0;
	padding: 0;
	outline: none;
	width: 60%;
`

export default NestOutput
