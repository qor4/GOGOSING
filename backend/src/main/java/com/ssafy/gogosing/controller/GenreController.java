package com.ssafy.gogosing.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.gogosing.dto.genre.request.GenreRequestDto;
import com.ssafy.gogosing.service.GenreService;

import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/genre")
public class GenreController {
	private final GenreService genreService;

	@PostMapping
	@ApiOperation(value = "좋아하는 장르 선택")
	public ResponseEntity<?> registGenre(@Valid @RequestBody GenreRequestDto genreRequestDto,
		@AuthenticationPrincipal UserDetails userDetails) throws Exception{
		genreService.registGenre(genreRequestDto, userDetails);
		return ResponseEntity.ok().body("");
	}

	@GetMapping
	@ApiOperation(value = "사용자 장르 조회")
	public List<Long> findGenres(@AuthenticationPrincipal UserDetails userDetails) {
		return genreService.findGenres(userDetails);
	}

	@PostMapping("/update")
	@ApiOperation(value = "장르 수정")
	public ResponseEntity<?> updateGenre(@Valid @RequestBody GenreRequestDto genreRequestDto,
		@AuthenticationPrincipal UserDetails userDetails) throws Exception{
		genreService.updateGenre(genreRequestDto, userDetails);
		return ResponseEntity.ok().body("");
	}

	@GetMapping("/musicList/{genreId}")
	@ApiOperation(value = "장르별 노래 리스트")
	public ResponseEntity<?> findGenreList(@PathVariable("genreId") Long genreId,
		@RequestParam(value = "page") int page) throws Exception {
		Pageable pageable = PageRequest.of(page - 1, 50); // 페이지 번호를 0부터 시작하는 인덱스로 변환
		return ResponseEntity.ok().body(genreService.findGenreList(genreId, pageable));
	}
}
