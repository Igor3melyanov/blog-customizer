import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	isSidebarOpen: boolean;
	onSidebarToggle: () => void;
	currentParams: ArticleStateType;
	onApply: (params: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isSidebarOpen,
	onSidebarToggle,
	currentParams,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [localParams, setLocalParams] =
		useState<ArticleStateType>(currentParams);

	useEffect(() => {
		setLocalParams(currentParams);
	}, [currentParams]);

	const handleFontFamilyChange = (option: OptionType) => {
		setLocalParams((prev) => ({
			...prev,
			fontFamilyOption: option,
		}));
	};

	const handleFontSizeChange = (option: OptionType) => {
		setLocalParams((prev) => ({
			...prev,
			fontSizeOption: option,
		}));
	};

	const handleFontColorChange = (option: OptionType) => {
		setLocalParams((prev) => ({
			...prev,
			fontColor: option,
		}));
	};

	const handleBackgroundColorChange = (option: OptionType) => {
		setLocalParams((prev) => ({
			...prev,
			backgroundColor: option,
		}));
	};

	const handleContentWidthChange = (option: OptionType) => {
		setLocalParams((prev) => ({
			...prev,
			contentWidth: option,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(localParams);
		onSidebarToggle();
	};

	const handleReset = () => {
		setLocalParams(defaultArticleState);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={onSidebarToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}
				onClick={() => {
					console.log('this works');
				}}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={localParams.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={localParams.fontSizeOption}
						onChange={handleFontSizeChange}
					/>

					<Select
						title='Цвет шрифта'
						selected={localParams.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
					/>

					<Separator></Separator>

					<Select
						title='Цвет фона'
						selected={localParams.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
					/>

					<Select
						title='Ширина контента'
						selected={localParams.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
