@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'WatchOut')
<img src="{{ asset('img/logo.svg') }}" class="logo" alt="WatchOut Logo" style="height: 50px;">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
